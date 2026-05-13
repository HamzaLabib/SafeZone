import { getDatabase } from './_lib/db.js';
import { formatFields, sendAdminNotification } from './_lib/email.js';
import { getClientIp, getUserAgent, parseJsonBody, rejectUnsupportedMethod, sendJson } from './_lib/http.js';
import { isRateLimited } from './_lib/rateLimit.js';
import { hasSpamTrap, validateRegistration } from './_lib/validation.js';

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
    status: 'new',
    notificationStatus: 'pending',
    createdAt,
    userAgent: getUserAgent(request),
    ipAddress,
  };

  try {
    const db = await getDatabase();
    const result = await db.collection('registrationLeads').insertOne(document);

    const fieldsHtml = formatFields({
      'Full name': data.fullName,
      Email: data.email,
      Phone: data.phone,
      'Course interest': data.courseInterest,
      'Preferred contact': data.preferredContactMethod,
      Message: data.message,
      Consent: data.consent ? 'Accepted' : 'Not accepted',
      Source: 'website',
      Submitted: createdAt.toISOString(),
    });

    try {
      await sendAdminNotification({
        subject: `New registration interest: ${data.courseInterest}`,
        html: `<h2>New registration interest</h2><table>${fieldsHtml}</table>`,
        text: [
          'New registration interest',
          `Full name: ${data.fullName}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone}`,
          `Course interest: ${data.courseInterest}`,
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
      );
    } catch (emailError) {
      await db.collection('registrationLeads').updateOne(
        { _id: result.insertedId },
        {
          $set: {
            notificationStatus: 'failed',
            notificationFailedAt: new Date(),
          },
        },
      );
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
