import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { CheckboxField, InputField, TextareaField } from '../components/ui/FormField';
import { businessInfo } from '../data/business';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false,
  website: '',
};

function validate(values) {
  const errors = {};

  if (!values.firstName.trim()) errors.firstName = 'Enter your first name.';
  if (!values.lastName.trim()) errors.lastName = 'Enter your last name.';

  if (!values.email.trim()) {
    errors.email = 'Enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.subject.trim()) {
    errors.subject = 'Enter a subject.';
  }

  if (!values.message.trim()) {
    errors.message = 'Enter your message.';
  }

  if (!values.consent) {
    errors.consent = 'Consent is required before admissions can contact you.';
  }

  return errors;
}

export function ContactPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      name: 'firstName',
      fullName: 'firstName',
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
      const firstName = values.firstName.trim();
      const lastName = values.lastName.trim();
      const name = `${firstName} ${lastName}`;
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          firstName,
          lastName,
          name,
          fullName: name,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setErrors(mapServerErrors(result.errors));
        setFormMessage({
          type: 'error',
          text: result.error || 'We could not submit your message right now.',
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
        title="Contact Admissions"
        description="Contact Safe Zone Security Academy about course schedules, registration, enrollment next steps, and training questions."
      />
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">Contact admissions</p>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-950">Questions about courses, schedules, or enrollment?</h1>
          <p className="mt-4 leading-7 text-slate-600">
            Reach out to Safe Zone Security Academy for help choosing a course and understanding the next step.
          </p>
          <Card className="mt-6 space-y-3 p-6">
            <p className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <Phone className="h-5 w-5 text-academyBlue" aria-hidden="true" />
              {businessInfo.phoneDisplay}
            </p>
            <a
              className="flex items-center gap-3 rounded text-sm font-semibold text-slate-700 hover:text-academyBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academyBlue"
              href={`mailto:${businessInfo.email}`}
            >
              <Mail className="h-5 w-5 text-academyBlue" aria-hidden="true" />
              {businessInfo.email}
            </a>
            <p className="flex items-start gap-3 text-sm font-semibold text-slate-700">
              <MapPin className="mt-0.5 h-5 w-5 text-academyBlue" aria-hidden="true" />
              {businessInfo.location} and surrounding service areas
            </p>
          </Card>
          <Button to="/register" className="mt-5">
            Register Interest
          </Button>
        </section>
        <Card as="section" className="p-6">
          <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                id="contact-first-name"
                label="First Name"
                name="firstName"
                required
                autoComplete="given-name"
                value={values.firstName}
                error={errors.firstName}
                onChange={handleChange}
              />
              <InputField
                id="contact-last-name"
                label="Last Name"
                name="lastName"
                required
                autoComplete="family-name"
                value={values.lastName}
                error={errors.lastName}
                onChange={handleChange}
              />
            </div>
            <InputField
              id="contact-email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              error={errors.email}
              onChange={handleChange}
            />
            <InputField
              id="contact-phone"
              label="Phone (optional)"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={handleChange}
            />
            <InputField
              id="contact-subject"
              label="Subject"
              name="subject"
              autoComplete="off"
              value={values.subject}
              error={errors.subject}
              onChange={handleChange}
            />
            <TextareaField
              id="contact-message"
              label="Message"
              name="message"
              autoComplete="off"
              value={values.message}
              error={errors.message}
              onChange={handleChange}
            />
            <CheckboxField
              id="contact-consent"
              label="I agree that Safe Zone Security Academy may store my submission and contact me about this inquiry."
              name="consent"
              checked={values.consent}
              error={errors.consent}
              onChange={handleChange}
            />
            <p className="text-xs leading-5 text-slate-500">
              Your form details may be stored in the academy's website database and admin tools so staff can respond. Online
              payments are not processed through this form.
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
              {isSubmitting ? 'Submitting...' : 'Send Message'}
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
