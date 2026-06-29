import { getDatabase } from './_lib/db.js';
import { formatFields, sendAdminNotification } from './_lib/email.js';
import { getClientIp, getUserAgent, parseJsonBody, rejectUnsupportedMethod, sendJson } from './_lib/http.js';
import { isRateLimited } from './_lib/rateLimit.js';
import { hasSpamTrap, validateRegistration } from './_lib/validation.js';
import { DEFAULT_CURRENCY, getCourseById, hasConfirmedPrice } from '../src/data/courses.js';

export default async function handler(request, response) {
  if (rejectUnsupportedMethod(request, response)) {
    return;
  }

  const ipAddress = getClientIp(request);

  if (isRateLimited(`register:${ipAddress}`)) {
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

  const { data, errors } = validateRegistration(body);
  const selectedCourse = data.selectedCourseId ? getCourseById(data.selectedCourseId) : null;

  if (Object.keys(errors).length > 0) {
    sendJson(response, 400, {
      ok: false,
      error: 'Please correct the highlighted fields.',
      errors,
    });
    return;
  }

  if (data.selectedCourseId && !selectedCourse) {
    sendJson(response, 400, {
      ok: false,
      error: 'Please correct the highlighted fields.',
      errors: {
        selectedCourseId: 'Choose a valid course of interest.',
      },
    });
    return;
  }

  const createdAt = new Date();
  const selectedCourseId = selectedCourse?.courseId || data.selectedCourseId || null;
  const selectedCourseTitle = selectedCourse?.title || data.selectedCourseTitle || data.courseInterest;
  const amountCents = selectedCourse && hasConfirmedPrice(selectedCourse) ? selectedCourse.amountCents : null;
  const currency = selectedCourse?.currency || DEFAULT_CURRENCY;
  const document = {
    ...data,
    courseInterest: selectedCourseTitle,
    selectedCourseId,
    selectedCourseTitle,
    amountCents,
    currency,
    paymentStatus: 'unpaid',
    linkedOrderId: null,
    source: 'website',
    status: 'New',
    notificationStatus: 'pending',
    createdAt,
    userAgent: getUserAgent(request),
    ipAddress,
  };

  try {
    const db = await getDatabase();
    const result = await db.collection('registrationLeads').insertOne(document);

    const fieldsHtml = formatFields({
      'First name': data.firstName,
      'Last name': data.lastName,
      'Full name': data.fullName,
      Email: data.email,
      Phone: data.phone,
      'Course interest': selectedCourseTitle,
      'Course ID': selectedCourseId,
      'Payment status': 'unpaid',
      'Course price': amountCents ? `${currency} ${(amountCents / 100).toFixed(2)}` : 'Contact us for pricing',
      'Preferred contact': data.preferredContactMethod,
      Message: data.message,
      Consent: data.consent ? 'Accepted' : 'Not accepted',
      Source: 'website',
      Submitted: createdAt.toISOString(),
    });

    try {
      await sendAdminNotification({
        subject: `New registration interest: ${selectedCourseTitle}`,
        html: `<h2>New registration interest</h2><table>${fieldsHtml}</table>`,
        text: [
          'New registration interest',
          `First name: ${data.firstName || '-'}`,
          `Last name: ${data.lastName || '-'}`,
          `Full name: ${data.fullName}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone}`,
          `Course interest: ${selectedCourseTitle}`,
          `Course ID: ${selectedCourseId || '-'}`,
          'Payment status: unpaid',
          `Course price: ${amountCents ? `${currency} ${(amountCents / 100).toFixed(2)}` : 'Contact us for pricing'}`,
          `Preferred contact: ${data.preferredContactMethod}`,
          `Message: ${data.message || '-'}`,
          `Submitted: ${createdAt.toISOString()}`,
        ].join('\n'),
      });

      await db.collection('registrationLeads').updateOne(
        { _id: result.insertedId },
        {
          $set: {
            notificationStatus: 'sent',
            notificationSentAt: new Date(),
          },
        },
      ).catch((statusError) => {
        console.error('registration notification status update failed', statusError);
      });
    } catch (emailError) {
      await db.collection('registrationLeads').updateOne(
        { _id: result.insertedId },
        {
          $set: {
            notificationStatus: 'failed',
            notificationFailedAt: new Date(),
          },
        },
      ).catch((statusError) => {
        console.error('registration notification failure status update failed', statusError);
      });
      console.error('registration notification failed', emailError);
    }

    sendJson(response, 201, {
      ok: true,
      message: 'Registration interest submitted successfully.',
    });
  } catch (error) {
    console.error('register-interest storage failed', error);
    sendJson(response, 500, {
      ok: false,
      error: 'We could not submit your registration request right now. Please try again later.',
    });
  }
}
