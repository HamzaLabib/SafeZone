import { ObjectId } from 'mongodb';
import { isAdminAuthenticated } from '../_lib/adminAuth.js';
import { getDatabase } from '../_lib/db.js';
import { sendJson } from '../_lib/http.js';

function serializeDocument(document) {
  return {
    ...document,
    _id: document._id instanceof ObjectId ? document._id.toString() : String(document._id),
    createdAt: document.createdAt instanceof Date ? document.createdAt.toISOString() : document.createdAt,
    updatedAt: document.updatedAt instanceof Date ? document.updatedAt.toISOString() : document.updatedAt,
    notificationSentAt:
      document.notificationSentAt instanceof Date ? document.notificationSentAt.toISOString() : document.notificationSentAt,
    notificationFailedAt:
      document.notificationFailedAt instanceof Date ? document.notificationFailedAt.toISOString() : document.notificationFailedAt,
  };
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    sendJson(response, 405, {
      ok: false,
      error: 'Method not allowed.',
    });
    return;
  }

  if (!isAdminAuthenticated(request)) {
    sendJson(response, 401, {
      ok: false,
      error: 'Admin login required.',
    });
    return;
  }

  try {
    const db = await getDatabase();
    const [registrationLeads, contactMessages, orderRequests] = await Promise.all([
      db.collection('registrationLeads').find({}).sort({ createdAt: -1 }).limit(500).toArray(),
      db.collection('contactMessages').find({}).sort({ createdAt: -1 }).limit(500).toArray(),
      db.collection('orderRequests').find({}).sort({ createdAt: -1 }).limit(500).toArray(),
    ]);

    sendJson(response, 200, {
      ok: true,
      registrationLeads: registrationLeads.map(serializeDocument),
      contactMessages: contactMessages.map(serializeDocument),
      orderRequests: orderRequests.map(serializeDocument),
    });
  } catch (error) {
    console.error('admin dashboard data failed', error);
    sendJson(response, 500, {
      ok: false,
      error: 'Could not load dashboard data.',
    });
  }
}
