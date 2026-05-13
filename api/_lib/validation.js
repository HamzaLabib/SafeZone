const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function cleanString(value, maxLength = 1000) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, maxLength);
}

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(value);
}

export function hasSpamTrap(body) {
  return Boolean(cleanString(body.website || body.company || body.url, 200));
}

export function validateRegistration(body) {
  const data = {
    fullName: cleanString(body.fullName, 120),
    email: cleanString(body.email, 180).toLowerCase(),
    phone: cleanString(body.phone, 60),
    courseInterest: cleanString(body.courseInterest, 160),
    preferredContactMethod: cleanString(body.preferredContactMethod, 40),
    message: cleanString(body.message, 2000),
    consent: body.consent === true,
  };
  const errors = {};

  if (!data.fullName) errors.fullName = 'Full name is required.';
  if (!data.email) errors.email = 'Email is required.';
  if (data.email && !isValidEmail(data.email)) errors.email = 'Enter a valid email address.';
  if (!data.phone) errors.phone = 'Phone number is required.';
  if (!data.courseInterest) errors.courseInterest = 'Course of interest is required.';
  if (!data.preferredContactMethod) errors.preferredContactMethod = 'Preferred contact method is required.';
  if (!data.consent) errors.consent = 'Consent must be accepted.';

  return { data, errors };
}

export function validateContact(body) {
  const data = {
    name: cleanString(body.name, 120),
    email: cleanString(body.email, 180).toLowerCase(),
    phone: cleanString(body.phone, 60),
    subject: cleanString(body.subject, 160),
    message: cleanString(body.message, 3000),
  };
  const errors = {};

  if (!data.name) errors.name = 'Name is required.';
  if (!data.email) errors.email = 'Email is required.';
  if (data.email && !isValidEmail(data.email)) errors.email = 'Enter a valid email address.';
  if (!data.subject) errors.subject = 'Subject is required.';
  if (!data.message) errors.message = 'Message is required.';

  return { data, errors };
}
