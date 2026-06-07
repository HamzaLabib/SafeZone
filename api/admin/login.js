import { createAdminSessionCookie, isAdminAuthenticated, isValidAdminPassword } from '../_lib/adminAuth.js';
import { parseJsonBody, sendJson } from '../_lib/http.js';

export default async function handler(request, response) {
  if (request.method === 'GET') {
    sendJson(response, 200, {
      ok: true,
      authenticated: isAdminAuthenticated(request),
    });
    return;
  }

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'GET, POST');
    sendJson(response, 405, {
      ok: false,
      error: 'Method not allowed.',
    });
    return;
  }

  const body = parseJsonBody(request);

  if (!body || !isValidAdminPassword(body.password)) {
    sendJson(response, 401, {
      ok: false,
      error: 'Invalid admin password.',
    });
    return;
  }

  response.setHeader('Set-Cookie', createAdminSessionCookie());
  sendJson(response, 200, {
    ok: true,
    authenticated: true,
  });
}
