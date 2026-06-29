import { getDatabase } from './_lib/db.js';
import { formatFields, sendAdminNotification } from './_lib/email.js';
import { getClientIp, getUserAgent, parseJsonBody, rejectUnsupportedMethod, sendJson } from './_lib/http.js';
import { isRateLimited } from './_lib/rateLimit.js';
import { hasSpamTrap, validateOrderRequest } from './_lib/validation.js';
import { DEFAULT_PRODUCT_CURRENCY, getProductById, isProductRequestable } from '../src/data/products.js';

const fulfillmentLabels = {
  pickup: 'Pickup',
  shipping: 'Shipping',
  either: 'Either pickup or shipping',
};

function formatProductPrice(product) {
  if (Number.isInteger(product.amountCents) && product.amountCents > 0) {
    return `${product.currency || DEFAULT_PRODUCT_CURRENCY} ${(product.amountCents / 100).toFixed(2)}`;
  }

  return product.displayPrice || 'Contact us for pricing';
}

export default async function handler(request, response) {
  if (rejectUnsupportedMethod(request, response)) {
    return;
  }

  const ipAddress = getClientIp(request);

  if (isRateLimited(`order-request:${ipAddress}`)) {
    sendJson(response, 429, {
      ok: false,
      error: 'Too many requests. Please try again later.',
    });
    return;
  }

  const body = parseJsonBody(request);

  if (!body) {
    sendJson(response, 400, {
      ok: false,
      error: 'Invalid JSON request body.',
    });
    return;
  }

  if (hasSpamTrap(body)) {
    sendJson(response, 400, {
      ok: false,
      error: 'Submission rejected.',
    });
    return;
  }

  const { data, errors } = validateOrderRequest(body);
  const product = data.productId ? getProductById(data.productId) : null;

  if (Object.keys(errors).length > 0) {
    sendJson(response, 400, {
      ok: false,
      error: 'Please correct the highlighted fields.',
      errors,
    });
    return;
  }

  if (!product || !isProductRequestable(product)) {
    sendJson(response, 400, {
      ok: false,
      error: 'Please correct the highlighted fields.',
      errors: {
        productId: 'Choose a valid requestable item.',
      },
    });
    return;
  }

  const createdAt = new Date();
  const document = {
    firstName: data.firstName,
    lastName: data.lastName,
    name: data.name,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    productId: product.productId,
    productTitle: product.title,
    sku: product.sku,
    category: product.category,
    quantity: data.quantity,
    fulfillmentPreference: data.fulfillmentPreference,
    message: data.message,
    consent: data.consent,
    displayPrice: product.displayPrice,
    amountCents: Number.isInteger(product.amountCents) ? product.amountCents : null,
    currency: product.currency || DEFAULT_PRODUCT_CURRENCY,
    taxable: product.taxable,
    shippingRequired: product.shippingRequired,
    pickupEligible: product.pickupEligible,
    status: 'New',
    paymentStatus: 'unpaid',
    linkedOrderId: null,
    source: 'website',
    notificationStatus: 'pending',
    createdAt,
    userAgent: getUserAgent(request),
    ipAddress,
  };

  try {
    const db = await getDatabase();
    const result = await db.collection('orderRequests').insertOne(document);
    const priceLabel = formatProductPrice(product);
    const fulfillmentLabel = fulfillmentLabels[data.fulfillmentPreference] || data.fulfillmentPreference;

    const fieldsHtml = formatFields({
      'First name': data.firstName,
      'Last name': data.lastName,
      'Full name': data.fullName,
      Email: data.email,
      Phone: data.phone,
      Item: product.title,
      SKU: product.sku,
      Category: product.category,
      Quantity: data.quantity,
      'Fulfillment preference': fulfillmentLabel,
      'Listed price': priceLabel,
      'Payment status': 'unpaid',
      Message: data.message,
      Note: 'This is a request only. Final price, taxes, availability, and pickup or shipping must be confirmed.',
      Source: 'website',
      Submitted: createdAt.toISOString(),
    });

    try {
      await sendAdminNotification({
        subject: `New shop request: ${product.title}`,
        html: `<h2>New shop item request</h2><table>${fieldsHtml}</table>`,
        text: [
          'New shop item request',
          `First name: ${data.firstName || '-'}`,
          `Last name: ${data.lastName || '-'}`,
          `Full name: ${data.fullName}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone}`,
          `Item: ${product.title}`,
          `SKU: ${product.sku}`,
          `Category: ${product.category}`,
          `Quantity: ${data.quantity}`,
          `Fulfillment preference: ${fulfillmentLabel}`,
          `Listed price: ${priceLabel}`,
          'Payment status: unpaid',
          `Message: ${data.message || '-'}`,
          'Note: This is a request only. Final price, taxes, availability, and pickup or shipping must be confirmed.',
          `Submitted: ${createdAt.toISOString()}`,
        ].join('\n'),
      });

      await db.collection('orderRequests').updateOne(
        { _id: result.insertedId },
        {
          $set: {
            notificationStatus: 'sent',
            notificationSentAt: new Date(),
          },
        },
      ).catch((statusError) => {
        console.error('order request notification status update failed', statusError);
      });
    } catch (emailError) {
      await db.collection('orderRequests').updateOne(
        { _id: result.insertedId },
        {
          $set: {
            notificationStatus: 'failed',
            notificationFailedAt: new Date(),
          },
        },
      ).catch((statusError) => {
        console.error('order request notification failure status update failed', statusError);
      });
      console.error('order request notification failed', emailError);
    }

    sendJson(response, 201, {
      ok: true,
      message: 'Item request submitted successfully.',
    });
  } catch (error) {
    console.error('order request storage failed', error);
    sendJson(response, 500, {
      ok: false,
      error: 'We could not submit your item request right now. Please try again later.',
    });
  }
}
