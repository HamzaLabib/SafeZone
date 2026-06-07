import { ObjectId } from 'mongodb';
import { isAdminAuthenticated } from '../_lib/adminAuth.js';
import { getDatabase } from '../_lib/db.js';
import { parseJsonBody, sendJson } from '../_lib/http.js';

const ALLOWED_STATUSES = new Set(['New', 'Contacted', 'Registered', 'Not Interested']);

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
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

  const body = parseJsonBody(request);
  const id = String(body?.id || '');
  const status = String(body?.status || '');

  if (!ObjectId.isValid(id) || !ALLOWED_STATUSES.has(status)) {
    sendJson(response, 400, {
      ok: false,
      error: 'Invalid lead status update.',
    });
    return;
  }

  try {
    const db = await getDatabase();
    const result = await db.collection('registrationLeads').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
    );

    if (!result.matchedCount) {
      sendJson(response, 404, {
        ok: false,
        error: 'Lead not found.',
      });
      return;
    }

    sendJson(response, 200, {
      ok: true,
      status,
    });
  } catch (error) {
    console.error('admin lead status update failed', error);
    sendJson(response, 500, {
      ok: false,
      error: 'Could not update lead status.',
    });
  }
}
