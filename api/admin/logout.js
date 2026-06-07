import { clearAdminSessionCookie } from '../_lib/adminAuth.js';
import { sendJson } from '../_lib/http.js';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    sendJson(response, 405, {
      ok: false,
      error: 'Method not allowed.',
    });
    return;
  }

  response.setHeader('Set-Cookie', clearAdminSessionCookie());
  sendJson(response, 200, {
    ok: true,
  });
}
