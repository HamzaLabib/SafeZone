function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

const EMAIL_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

function extractEmailAddress(value) {
  const trimmed = String(value || '').trim();
  const bracketMatch = trimmed.match(/<([^<>]+)>/);

  return bracketMatch ? bracketMatch[1].trim() : trimmed;
}

function isEmailAddressLike(value) {
  return EMAIL_PATTERN.test(extractEmailAddress(value));
}

export function formatFields(fields) {
  return Object.entries(fields)
    .map(([label, value]) => `<tr><th align="left" style="padding:6px 12px 6px 0;">${escapeHtml(label)}</th><td style="padding:6px 0;">${escapeHtml(value || '-')}</td></tr>`)
    .join('');
}

export async function sendAdminNotification({ subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_NOTIFICATION_EMAIL;
  const from = process.env.EMAIL_FROM;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  if (!to) {
    throw new Error('ADMIN_NOTIFICATION_EMAIL is not configured.');
  }

  if (!from) {
    throw new Error('EMAIL_FROM is not configured.');
  }

  if (!isEmailAddressLike(from)) {
    throw new Error('EMAIL_FROM must be a valid email address or "Name <email@example.com>".');
  }

  if (!isEmailAddressLike(to)) {
    throw new Error('ADMIN_NOTIFICATION_EMAIL must be a valid email address.');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Email notification failed: ${details}`);
  }
}
