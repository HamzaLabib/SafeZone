export function sendJson(response, statusCode, body) {
  response.setHeader('Content-Type', 'application/json');
  response.status(statusCode).json(body);
}

export function getClientIp(request) {
  const forwardedFor = request.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers['x-real-ip'];

  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim();
  }

  return request.socket?.remoteAddress || '';
}

export function getUserAgent(request) {
  const userAgent = request.headers['user-agent'];
  return typeof userAgent === 'string' ? userAgent.slice(0, 500) : '';
}

export function parseJsonBody(request) {
  if (!request.body) {
    return {};
  }

  if (typeof request.body === 'object') {
    return request.body;
  }

  if (typeof request.body === 'string') {
    try {
      return JSON.parse(request.body);
    } catch {
      return null;
    }
  }

  return null;
}

export function rejectUnsupportedMethod(request, response, allowedMethod = 'POST') {
  if (request.method === allowedMethod) {
    return false;
  }

  if (request.method === 'OPTIONS') {
    response.setHeader('Allow', allowedMethod);
    sendJson(response, 204, {});
    return true;
  }

  response.setHeader('Allow', allowedMethod);
  sendJson(response, 405, {
    ok: false,
    error: `Method not allowed. Use ${allowedMethod}.`,
  });
  return true;
}
