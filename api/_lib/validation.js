const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FULFILLMENT_PREFERENCES = new Set(['pickup', 'shipping', 'either']);

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

function normalizeNameFields(body) {
  const firstName = cleanString(body.firstName, 60);
  const lastName = cleanString(body.lastName, 60);
  const legacyName = cleanString(body.name || body.fullName, 120);
  const combinedName = [firstName, lastName].filter(Boolean).join(' ');

  return {
    firstName,
    lastName,
    name: combinedName || legacyName,
    fullName: combinedName || legacyName,
    usesSplitFields:
      Object.prototype.hasOwnProperty.call(body, 'firstName') || Object.prototype.hasOwnProperty.call(body, 'lastName'),
  };
}

function validateNameFields(nameFields, errors, legacyErrorKey) {
  if (nameFields.usesSplitFields) {
    if (!nameFields.firstName) errors.firstName = 'First name is required.';
    if (!nameFields.lastName) errors.lastName = 'Last name is required.';
    return;
  }

  if (!nameFields.name) errors[legacyErrorKey] = 'Name is required.';
}

function parseStrictInteger(value) {
  if (typeof value === 'number') {
    return Number.isSafeInteger(value) ? value : null;
  }

  if (typeof value !== 'string' || !/^\d+$/.test(value)) {
    return null;
  }

  const parsedValue = Number(value);
  return Number.isSafeInteger(parsedValue) ? parsedValue : null;
}

export function validateRegistration(body) {
  const data = {
    fullName: cleanString(body.fullName, 120),
    email: cleanString(body.email, 180).toLowerCase(),
    phone: cleanString(body.phone, 60),
    selectedCourseId: cleanString(body.selectedCourseId || body.courseId, 120),
    selectedCourseTitle: cleanString(body.selectedCourseTitle, 160),
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
    consent: body.consent === true,
  };
  const errors = {};

  if (!data.name) errors.name = 'Name is required.';
  if (!data.email) errors.email = 'Email is required.';
  if (data.email && !isValidEmail(data.email)) errors.email = 'Enter a valid email address.';
  if (!data.subject) errors.subject = 'Subject is required.';
  if (!data.message) errors.message = 'Message is required.';
  if (!data.consent) errors.consent = 'Consent must be accepted.';

  return { data, errors };
}

export function validateOrderRequest(body) {
  const quantity = parseStrictInteger(body.quantity);
  const nameFields = normalizeNameFields(body);
  const data = {
    fullName: cleanString(body.fullName, 120),
    email: cleanString(body.email, 180).toLowerCase(),
    phone: cleanString(body.phone, 60),
    productId: cleanString(body.productId, 120),
    productTitle: cleanString(body.productTitle, 180),
    quantity: quantity ?? 0,
    fulfillmentPreference: cleanString(body.fulfillmentPreference, 40),
    message: cleanString(body.message, 2000),
    consent: body.consent === true,
  };
  const errors = {};

  if (!data.fullName) errors.fullName = 'Full name is required.';
  if (!data.email) errors.email = 'Email is required.';
  if (data.email && !isValidEmail(data.email)) errors.email = 'Enter a valid email address.';
  if (!data.phone) errors.phone = 'Phone number is required.';
  if (!data.productId) errors.productId = 'Item is required.';
  if (!Number.isInteger(data.quantity) || data.quantity < 1 || data.quantity > 99) {
    errors.quantity = 'Quantity must be between 1 and 99.';
  }
  if (!FULFILLMENT_PREFERENCES.has(data.fulfillmentPreference)) {
    errors.fulfillmentPreference = 'Choose a valid fulfillment preference.';
  }
  if (!data.consent) errors.consent = 'Consent must be accepted.';

  return { data, errors };
}
