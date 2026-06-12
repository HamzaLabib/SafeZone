import { createAdminSessionCookie, isAdminAuthenticated, isValidAdminPassword } from '../_lib/adminAuth.js';
import { getClientIp, parseJsonBody, sendJson } from '../_lib/http.js';
import { isRateLimited } from '../_lib/rateLimit.js';

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

  const ipAddress = getClientIp(request);

  if (isRateLimited(`admin-login:${ipAddress}`)) {
    sendJson(response, 429, {
      ok: false,
      error: 'Too many login attempts. Please try again later.',
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
