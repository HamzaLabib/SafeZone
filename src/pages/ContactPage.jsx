import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { InputField, TextareaField } from '../components/ui/FormField';
import { businessInfo } from '../data/business';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  website: '',
};

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Enter your name.';
  }

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

  return errors;
}

export function ContactPage() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      const nextErrors = { ...current };
      delete nextErrors[name];
      return nextErrors;
    });
    setFormMessage(null);
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setErrors(result.errors || {});
        setFormMessage({
          type: 'error',
          text: result.error || 'We could not submit your message right now.',
        });
        return;
      }

      setValues(initialValues);
      setFormMessage({
        type: 'success',
        text: result.message || 'Contact message submitted successfully.',
      });
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
            <InputField
              id="contact-name"
              label="Name"
              name="name"
              autoComplete="name"
              value={values.name}
              error={errors.name}
              onChange={handleChange}
            />
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
