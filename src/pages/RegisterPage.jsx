import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { courses } from '../data/courses';

export function RegisterPage() {
  const [searchParams] = useSearchParams();
  const selectedFromUrl = searchParams.get('course') || '';
  const initialCourse = useMemo(
    () => (courses.some((course) => course.id === selectedFromUrl) ? selectedFromUrl : ''),
    [selectedFromUrl],
  );
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">Register or enroll</p>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-950">Start your security training journey.</h1>
        <p className="mt-4 leading-7 text-slate-600">
          Create an account or register interest in a course. Our admissions team will follow up with schedule, pricing, and enrollment next steps.
        </p>
        <div className="mt-6 rounded-lg bg-slate-950 p-5 text-white">
          <h2 className="text-lg font-bold">Already have an account?</h2>
          <p className="mt-2 text-sm text-white/75">Log in to view your courses, progress, certificates, and profile information.</p>
          <Link
            to="/login"
            className="mt-4 inline-flex cursor-pointer rounded-lg bg-academyBlue px-5 py-3 text-sm font-semibold transition hover:bg-blue-700"
          >
            Go to Login
          </Link>
        </div>
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Full name
            <input className="rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-academyBlue focus:ring-2 focus:ring-blue-100" name="name" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Email
            <input className="rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-academyBlue focus:ring-2 focus:ring-blue-100" name="email" type="email" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Phone number
            <input className="rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-academyBlue focus:ring-2 focus:ring-blue-100" name="phone" type="tel" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Selected course
            <select
              className="cursor-pointer rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-academyBlue focus:ring-2 focus:ring-blue-100"
              name="course"
              defaultValue={initialCourse}
              required
            >
              <option value="" disabled>
                Choose a course
              </option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Message
            <textarea
              className="min-h-32 rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-academyBlue focus:ring-2 focus:ring-blue-100"
              name="message"
              placeholder="Tell us about your goals, availability, or questions."
            />
          </label>
          <button className="cursor-pointer rounded-lg bg-academyBlue px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700" type="submit">
            Submit Registration
          </button>
          {submitted && (
            <p className="rounded-lg bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800">
              Thank you. Your registration interest has been received.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
