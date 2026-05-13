import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { CheckboxField, InputField, SelectField, TextareaField } from '../components/ui/FormField';
import { courses } from '../data/courses';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  course: '',
  contactMethod: 'email',
  message: '',
  consent: false,
};

function validate(values) {
  const errors = {};

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

  if (!values.course) {
    errors.course = 'Choose a course of interest.';
  }

  if (!values.consent) {
    errors.consent = 'Consent is required before admissions can contact you.';
  }

  return errors;
}

export function RegisterPage() {
  const [searchParams] = useSearchParams();
  const selectedFromUrl = searchParams.get('course') || '';
  const initialCourse = useMemo(
    () => (courses.some((course) => course.id === selectedFromUrl) ? selectedFromUrl : ''),
    [selectedFromUrl],
  );
  const [values, setValues] = useState({ ...initialValues, course: initialCourse });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setValues((current) => ({ ...current, course: initialCourse || current.course }));
  }, [initialCourse]);

  function handleChange(event) {
    const { name, type, checked, value } = event.target;
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setErrors((current) => {
      const nextErrors = { ...current };
      delete nextErrors[name];
      return nextErrors;
    });
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  return (
    <>
      <Seo
        title="Register Interest"
        description="Prepare a Safe Zone Security Academy course registration request and connect with admissions for schedule, pricing, and enrollment next steps."
      />
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">Register interest</p>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-950">Start your security training journey.</h1>
          <p className="mt-4 leading-7 text-slate-600">
            Submit your course interest so admissions can confirm schedule, pricing, format, and enrollment next steps once the form is connected to email or a database.
          </p>
          <Card className="mt-6 bg-academyNavy p-5 text-white">
            <h2 className="text-lg font-bold">Student accounts are coming soon</h2>
            <p className="mt-2 text-sm leading-6 text-white/75">
              This launch version collects course interest only. Real accounts, dashboards, and certificates require backend authentication before launch.
            </p>
            <Button to="/login" className="mt-4" variant="secondary">
              View Portal Status
            </Button>
          </Card>
        </section>
        <Card as="section" className="p-6">
          <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
            <InputField
              id="register-name"
              label="Full name"
              name="name"
              autoComplete="name"
              value={values.name}
              error={errors.name}
              onChange={handleChange}
            />
            <InputField
              id="register-email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              error={errors.email}
              onChange={handleChange}
            />
            <InputField
              id="register-phone"
              label="Phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              error={errors.phone}
              onChange={handleChange}
            />
            <SelectField
              id="register-course"
              label="Course of interest"
              name="course"
              value={values.course}
              error={errors.course}
              onChange={handleChange}
            >
              <option value="">Choose a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </SelectField>
            <SelectField
              id="register-contact-method"
              label="Preferred contact method"
              name="contactMethod"
              value={values.contactMethod}
              onChange={handleChange}
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="either">Either email or phone</option>
            </SelectField>
            <TextareaField
              id="register-message"
              label="Message / notes"
              name="message"
              autoComplete="off"
              placeholder="Tell us about your goals, availability, or questions."
              value={values.message}
              onChange={handleChange}
            />
            <CheckboxField
              id="register-consent"
              label="I agree to be contacted about my registration request."
              name="consent"
              checked={values.consent}
              error={errors.consent}
              onChange={handleChange}
            />
            <Button type="submit">Prepare Registration Request</Button>
            {submitted && (
              <p className="rounded-lg bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800">
                Thank you. Your request has been prepared. Please connect this form to email/database before launch.
              </p>
            )}
          </form>
        </Card>
      </main>
    </>
  );
}
