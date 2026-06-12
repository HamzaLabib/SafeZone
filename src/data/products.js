export const PRODUCT_CATEGORIES = ['Books', 'Course Materials', 'Equipment', 'Uniforms/Accessories', 'Bundles', 'Other'];
export const DEFAULT_PRODUCT_CURRENCY = 'CAD';
export const PRODUCT_CONTACT_FOR_PRICING = 'Contact us for pricing';

function createRequestOnlyFields(overrides = {}) {
  return {
    displayPrice: PRODUCT_CONTACT_FOR_PRICING,
    amountCents: null,
    currency: DEFAULT_PRODUCT_CURRENCY,
    inventoryStatus: 'Availability to be confirmed',
    active: true,
    requestEnabled: true,
    shippingRequired: false,
    pickupEligible: true,
    taxable: true,
    stripePriceId: '',
    paymentEnabled: false,
    ...overrides,
  };
}

export const products = [
  {
    productId: 'security-training-workbook',
    slug: 'security-training-workbook',
    sku: 'SZ-BOOK-001',
    title: 'Security Training Workbook',
    category: 'Books',
    description:
      'Printed workbook support for students reviewing core security topics, professional conduct, and course notes.',
    images: ['/logo-shield.svg'],
    imageAlt: 'Safe Zone Security Academy shield logo used as a pending product image',
    ...createRequestOnlyFields(),
  },
  {
    productId: 'course-note-package',
    slug: 'course-note-package',
    sku: 'SZ-MAT-001',
    title: 'Course Note Package',
    category: 'Course Materials',
    description:
      'Student course material package for selected programs. Final contents, availability, and pricing are confirmed by admissions.',
    images: ['/logo-shield.svg'],
    imageAlt: 'Safe Zone Security Academy shield logo used as a pending product image',
    ...createRequestOnlyFields(),
  },
  {
    productId: 'training-practice-kit',
    slug: 'training-practice-kit',
    sku: 'SZ-EQP-001',
    title: 'Training Practice Kit',
    category: 'Equipment',
    description:
      'Basic practice equipment request for training activities. Exact kit contents and availability must be confirmed by the academy.',
    images: ['/logo-shield.svg'],
    imageAlt: 'Safe Zone Security Academy shield logo used as a pending product image',
    ...createRequestOnlyFields({ shippingRequired: true }),
  },
  {
    productId: 'security-uniform-accessory-pack',
    slug: 'security-uniform-accessory-pack',
    sku: 'SZ-UNI-001',
    title: 'Security Uniform Accessory Pack',
    category: 'Uniforms/Accessories',
    description:
      'Uniform and accessory request for students or security personnel. Sizing, availability, and pickup or shipping details are confirmed after request.',
    images: ['/logo-shield.svg'],
    imageAlt: 'Safe Zone Security Academy shield logo used as a pending product image',
    ...createRequestOnlyFields({ shippingRequired: true }),
  },
  {
    productId: 'new-student-materials-bundle',
    slug: 'new-student-materials-bundle',
    sku: 'SZ-BDL-001',
    title: 'New Student Materials Bundle',
    category: 'Bundles',
    description:
      'Bundle request for common student materials. Final bundle contents, price, taxes, and fulfillment method are confirmed by the academy.',
    images: ['/logo-shield.svg'],
    imageAlt: 'Safe Zone Security Academy shield logo used as a pending product image',
    ...createRequestOnlyFields({ shippingRequired: true }),
  },
  {
    productId: 'custom-item-request',
    slug: 'custom-item-request',
    sku: 'SZ-OTH-001',
    title: 'Custom Item Request',
    category: 'Other',
    description:
      'Use this option when you need a material, book, equipment item, or accessory not listed in the current catalog.',
    images: ['/logo-shield.svg'],
    imageAlt: 'Safe Zone Security Academy shield logo used as a pending product image',
    ...createRequestOnlyFields({ shippingRequired: true, taxable: false }),
  },
];

export function getActiveProducts() {
  return products.filter((product) => product.active);
}

export function getProductById(productId) {
  return products.find((product) => product.productId === productId || product.slug === productId);
}

export function getProductCategories() {
  return ['All', ...PRODUCT_CATEGORIES];
}

export function isProductRequestable(product) {
  return Boolean(product?.active && product?.requestEnabled);
}

export function isProductPaymentReady(product) {
  return Boolean(
    product?.active &&
      product?.paymentEnabled &&
      Number.isInteger(product?.amountCents) &&
      product.amountCents > 0 &&
      product?.stripePriceId &&
      product?.currency,
  );
}
