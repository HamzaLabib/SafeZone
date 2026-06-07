import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'safezone_admin_session';
const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;
const SESSION_MAX_AGE_MS = SESSION_MAX_AGE_SECONDS * 1000;

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error('ADMIN_PASSWORD is not configured.');
  }

  return password;
}

function sign(value) {
  return createHmac('sha256', getAdminPassword()).update(value).digest('base64url');
}

function safeCompare(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function isValidAdminPassword(password) {
  return safeCompare(password || '', getAdminPassword());
}

export function createAdminSessionCookie() {
  const issuedAt = Date.now();
  const payload = String(issuedAt);
  const token = `${payload}.${sign(payload)}`;
  const secureFlag = process.env.NODE_ENV === 'production' || process.env.VERCEL ? 'Secure' : '';

  return [
    `${COOKIE_NAME}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    secureFlag,
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
  ]
    .filter(Boolean)
    .join('; ');
}

export function clearAdminSessionCookie() {
  const secureFlag = process.env.NODE_ENV === 'production' || process.env.VERCEL ? '; Secure' : '';
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax${secureFlag}; Max-Age=0`;
}

function getCookie(request, name) {
  const cookieHeader = request.headers.cookie || '';

  return cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

export function isAdminAuthenticated(request) {
  const token = getCookie(request, COOKIE_NAME);

  if (!token) {
    return false;
  }

  const [payload, signature] = token.split('.');
  const issuedAt = Number(payload);

  if (!payload || !signature || !Number.isFinite(issuedAt)) {
    return false;
  }

  if (Date.now() - issuedAt > SESSION_MAX_AGE_MS) {
    return false;
  }

  return safeCompare(signature, sign(payload));
}
