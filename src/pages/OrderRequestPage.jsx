import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { CheckboxField, InputField, SelectField, TextareaField } from '../components/ui/FormField';
import { businessInfo } from '../data/business';
import { getActiveProducts } from '../data/products';

const REQUEST_NOTICE =
  'Submitting a request is not a purchase. Final price, taxes, availability, and pickup or shipping will be confirmed by the academy.';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  product: '',
  quantity: '1',
  fulfillmentPreference: 'pickup',
  message: '',
  consent: false,
  website: '',
};

function validate(values) {
  const errors = {};
  const quantity = Number.parseInt(values.quantity, 10);

  if (!values.name.trim()) {
    errors.name = 'Enter your full name.';
  }

  if (!values.email.trim()) {
    errors.email = 'Enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Enter your phone number.';
  }

  if (!values.product) {
    errors.product = 'Choose an item.';
  }

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    errors.quantity = 'Enter a quantity from 1 to 99.';
  }

  if (!values.fulfillmentPreference) {
    errors.fulfillmentPreference = 'Choose a fulfillment preference.';
  }

  if (!values.consent) {
    errors.consent = 'Consent is required before the academy can contact you.';
  }

  return errors;
}

export function OrderRequestPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const products = getActiveProducts();
  const selectedFromUrl = searchParams.get('product') || '';
  const initialProduct = useMemo(
    () => (products.some((product) => product.productId === selectedFromUrl) ? selectedFromUrl : ''),
    [products, selectedFromUrl],
  );
  const [values, setValues] = useState({ ...initialValues, product: initialProduct });
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setValues((current) => ({ ...current, product: initialProduct || current.product }));
  }, [initialProduct]);

  function handleChange(event) {
    const { name, type, checked, value } = event.target;
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setErrors((current) => {
      const nextErrors = { ...current };
      delete nextErrors[name];
      return nextErrors;
    });
    setFormMessage(null);
  }

  function mapServerErrors(serverErrors = {}) {
    const fieldMap = {
      productId: 'product',
      fullName: 'name',
    };

    return Object.entries(serverErrors).reduce((nextErrors, [key, value]) => {
      nextErrors[fieldMap[key] || key] = value;
      return nextErrors;
    }, {});
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setFormMessage(null);

    try {
      const selectedProduct = products.find((product) => product.productId === values.product);
      const response = await fetch('/api/order-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: values.name,
          email: values.email,
          phone: values.phone,
          productId: selectedProduct?.productId || values.product,
          productTitle: selectedProduct?.title || values.product,
          quantity: Number.parseInt(values.quantity, 10),
          fulfillmentPreference: values.fulfillmentPreference,
          message: values.message,
          consent: values.consent,
          website: values.website,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setErrors(mapServerErrors(result.errors));
        setFormMessage({
          type: 'error',
          text: result.error || 'We could not submit your request right now.',
        });
        return;
      }

      navigate('/thank-you');
    } catch {
      setFormMessage({
        type: 'error',
        text: 'We could not reach the server. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Seo
        title="Request an Item"
        description="Submit a Safe Zone Security Academy shop request for books, materials, equipment, accessories, or bundles."
      />
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">Request to order</p>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-950">Request shop items from the academy.</h1>
          <p className="mt-4 leading-7 text-slate-600">
            Send your item request and the academy will confirm price, taxes, availability, and pickup or shipping details before
            any purchase is finalized.
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            For item questions, email{' '}
            <a
              className="font-semibold text-academyBlue hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academyBlue"
              href={`mailto:${businessInfo.email}`}
            >
              {businessInfo.email}
            </a>
            .
          </p>
          <Card className="mt-6 p-5">
            <p className="text-sm font-semibold text-blue-900">{REQUEST_NOTICE}</p>
          </Card>
        </section>

        <Card as="section" className="p-6">
          <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
            <InputField
              id="order-name"
              label="Full name"
              name="name"
              autoComplete="name"
              value={values.name}
              error={errors.name}
              onChange={handleChange}
            />
            <InputField
              id="order-email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              error={errors.email}
              onChange={handleChange}
            />
            <InputField
              id="order-phone"
              label="Phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              error={errors.phone}
              onChange={handleChange}
            />
            <SelectField
              id="order-product"
              label="Item"
              name="product"
              value={values.product}
              error={errors.product}
              onChange={handleChange}
            >
              <option value="">Choose an item</option>
              {products.map((product) => (
                <option key={product.productId} value={product.productId}>
                  {product.title}
                </option>
              ))}
            </SelectField>
            <InputField
              id="order-quantity"
              label="Quantity"
              name="quantity"
              type="number"
              min="1"
              max="99"
              value={values.quantity}
              error={errors.quantity}
              onChange={handleChange}
            />
            <SelectField
              id="order-fulfillment"
              label="Fulfillment preference"
              name="fulfillmentPreference"
              value={values.fulfillmentPreference}
              error={errors.fulfillmentPreference}
              onChange={handleChange}
            >
              <option value="pickup">Pickup</option>
              <option value="shipping">Shipping</option>
              <option value="either">Either pickup or shipping</option>
            </SelectField>
            <TextareaField
              id="order-message"
              label="Message / notes"
              name="message"
              autoComplete="off"
              placeholder="Tell us about sizing, preferred pickup timing, shipping questions, or item details."
              value={values.message}
              onChange={handleChange}
            />
            <CheckboxField
              id="order-consent"
              label="I agree that Safe Zone Security Academy may store my submission and contact me about this item request."
              name="consent"
              checked={values.consent}
              error={errors.consent}
              onChange={handleChange}
            />
            <p className="text-xs leading-5 text-slate-500">
              This request is not a purchase. Your details may be stored in the academy's website database and admin tools so
              staff can confirm price, taxes, availability, and fulfillment before any sale is finalized.
            </p>
            <input
              className="hidden"
              name="website"
              tabIndex="-1"
              autoComplete="off"
              value={values.website}
              onChange={handleChange}
              aria-hidden="true"
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Item Request'}
            </Button>
            {formMessage && (
              <p
                className={[
                  'rounded-lg px-4 py-3 text-sm font-semibold',
                  formMessage.type === 'success' ? 'bg-blue-50 text-blue-800' : 'bg-red-50 text-red-800',
                ].join(' ')}
              >
                {formMessage.text}
              </p>
            )}
          </form>
        </Card>
      </main>
    </>
  );
}
