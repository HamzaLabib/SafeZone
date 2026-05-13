const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 10;
const buckets = new Map();

export function isRateLimited(key) {
  const now = Date.now();
  const bucketKey = key || 'unknown';

  for (const [storedKey, bucket] of buckets.entries()) {
    if (bucket.expiresAt < now) {
      buckets.delete(storedKey);
    }
  }

  const existing = buckets.get(bucketKey);

  if (!existing || existing.expiresAt < now) {
    buckets.set(bucketKey, { count: 1, expiresAt: now + WINDOW_MS });
    return false;
  }

  existing.count += 1;
  buckets.set(bucketKey, existing);

  return existing.count > MAX_REQUESTS;
}
