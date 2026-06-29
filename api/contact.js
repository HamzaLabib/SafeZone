import { getDatabase } from './_lib/db.js';
import { formatFields, sendAdminNotification } from './_lib/email.js';
import { getClientIp, getUserAgent, parseJsonBody, rejectUnsupportedMethod, sendJson } from './_lib/http.js';
import { isRateLimited } from './_lib/rateLimit.js';
import { hasSpamTrap, validateContact } from './_lib/validation.js';

export default async function handler(request, response) {
  if (rejectUnsupportedMethod(request, response)) {
    return;
  }

  const ipAddress = getClientIp(request);

  if (isRateLimited(`contact:${ipAddress}`)) {
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

  const { data, errors } = validateContact(body);

  if (Object.keys(errors).length > 0) {
    sendJson(response, 400, {
      ok: false,
      error: 'Please correct the highlighted fields.',
      errors,
    });
    return;
  }

  const createdAt = new Date();
  const document = {
    ...data,
    source: 'website',
    status: 'New',
    notificationStatus: 'pending',
    createdAt,
    userAgent: getUserAgent(request),
    ipAddress,
  };

  try {
    const db = await getDatabase();
    const result = await db.collection('contactMessages').insertOne(document);

    const fieldsHtml = formatFields({
      'First name': data.firstName,
      'Last name': data.lastName,
      'Full name': data.fullName,
      Email: data.email,
      Phone: data.phone,
      Subject: data.subject,
      Message: data.message,
      Consent: data.consent ? 'Accepted' : 'Not accepted',
      Source: 'website',
      Submitted: createdAt.toISOString(),
    });

    try {
      await sendAdminNotification({
        subject: `New website contact: ${data.subject}`,
        html: `<h2>New website contact message</h2><table>${fieldsHtml}</table>`,
        text: [
          'New website contact message',
          `First name: ${data.firstName || '-'}`,
          `Last name: ${data.lastName || '-'}`,
          `Full name: ${data.fullName}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone || '-'}`,
          `Subject: ${data.subject}`,
          `Message: ${data.message}`,
          `Consent: ${data.consent ? 'Accepted' : 'Not accepted'}`,
          `Submitted: ${createdAt.toISOString()}`,
        ].join('\n'),
      });

      await db.collection('contactMessages').updateOne(
        { _id: result.insertedId },
        {
          $set: {
            notificationStatus: 'sent',
            notificationSentAt: new Date(),
          },
        },
      ).catch((statusError) => {
        console.error('contact notification status update failed', statusError);
      });
    } catch (emailError) {
      await db.collection('contactMessages').updateOne(
        { _id: result.insertedId },
        {
          $set: {
            notificationStatus: 'failed',
            notificationFailedAt: new Date(),
          },
        },
      ).catch((statusError) => {
        console.error('contact notification failure status update failed', statusError);
      });
      console.error('contact notification failed', emailError);
    }

    sendJson(response, 201, {
      ok: true,
      message: 'Contact message submitted successfully.',
    });
  } catch (error) {
    console.error('contact storage failed', error);
    sendJson(response, 500, {
      ok: false,
      error: 'We could not submit your message right now. Please try again later.',
    });
  }
}
