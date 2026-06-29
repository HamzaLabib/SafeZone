import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { CheckboxField, InputField, SelectField, TextareaField } from '../components/ui/FormField';
import { businessInfo, clearCriminalRecordNote } from '../data/business';
import { courses } from '../data/courses';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  course: '',
  contactMethod: 'email',
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedFromUrl = searchParams.get('course') || '';
  const initialCourse = useMemo(
    () => (courses.some((course) => course.courseId === selectedFromUrl) ? selectedFromUrl : ''),
    [selectedFromUrl],
  );
  const [values, setValues] = useState({ ...initialValues, course: initialCourse });
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setFormMessage(null);
  }

  function mapServerErrors(serverErrors = {}) {
    const fieldMap = {
      name: 'firstName',
      fullName: 'firstName',
      selectedCourseId: 'course',
      courseInterest: 'course',
      preferredContactMethod: 'contactMethod',
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
      const selectedCourse = courses.find((course) => course.courseId === values.course);
      const firstName = values.firstName.trim();
      const lastName = values.lastName.trim();
      const name = `${firstName} ${lastName}`;
      const response = await fetch('/api/register-interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          name,
          fullName: name,
          email: values.email,
          phone: values.phone,
          selectedCourseId: selectedCourse?.courseId || values.course,
          selectedCourseTitle: selectedCourse?.title || values.course,
          courseInterest: selectedCourse?.title || values.course,
          preferredContactMethod: values.contactMethod,
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
        title="Register Interest"
        description="Submit a Safe Zone Security Academy course registration request and connect with admissions for schedule, pricing, and enrollment next steps."
      />
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">Register interest</p>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-950">Start your security training journey.</h1>
          <p className="mt-4 leading-7 text-slate-600">
            Submit your course interest so admissions can confirm schedule, pricing, format, and enrollment next steps.
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Prefer email? Contact admissions at{' '}
            <a
              className="font-semibold text-academyBlue hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academyBlue"
              href={`mailto:${businessInfo.email}`}
            >
              {businessInfo.email}
            </a>
            .
          </p>
          <Card as="figure" className="mt-6 overflow-hidden">
            <img
              src="/training-images/security-indoor.png"
              alt="Safe Zone security officer standing inside a professional facility before registration"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">Professional readiness</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Start with a simple request. Admissions will confirm the details before enrollment is finalized.
              </p>
            </figcaption>
          </Card>
        </section>
        <Card as="section" className="p-6">
          <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                id="register-first-name"
                label="First Name"
                name="firstName"
                required
                autoComplete="given-name"
                value={values.firstName}
                error={errors.firstName}
                onChange={handleChange}
              />
              <InputField
                id="register-last-name"
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
                <option key={course.courseId} value={course.courseId}>
                  {course.title}
                </option>
              ))}
            </SelectField>
            <div role="note" className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-950">
              {clearCriminalRecordNote}
            </div>
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
              label="I agree that Safe Zone Security Academy may store my submission and contact me about this registration interest request."
              name="consent"
              checked={values.consent}
              error={errors.consent}
              onChange={handleChange}
            />
            <p className="text-xs leading-5 text-slate-500">
              This is not confirmed enrollment. Your details may be stored in the academy's website database and admin tools so
              admissions can confirm schedule, pricing, format, and next steps. No online payment is processed here.
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
              {isSubmitting ? 'Submitting...' : 'Submit Registration Request'}
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
