import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">Contact us</p>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-950">Questions about courses, schedules, or enrollment?</h1>
        <p className="mt-4 leading-7 text-slate-600">
          Reach out to Safe Zone Security Academy and our team will help you choose the right training path.
        </p>
        <div className="mt-6 space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <a className="flex items-center gap-3 text-sm font-semibold text-slate-700 hover:text-academyBlue" href="tel:+15145550123">
            <Phone className="h-5 w-5 text-academyBlue" />
            (514) 555-0123
          </a>
          <a className="flex items-center gap-3 text-sm font-semibold text-slate-700 hover:text-academyBlue" href="mailto:info@safezonesecurityacademy.ca">
            <Mail className="h-5 w-5 text-academyBlue" />
            info@safezonesecurityacademy.ca
          </a>
          <p className="flex items-start gap-3 text-sm font-semibold text-slate-700">
            <MapPin className="mt-0.5 h-5 w-5 text-academyBlue" />
            Montreal, QC and surrounding service areas
          </p>
        </div>
        <Link
          to="/register"
          className="mt-5 inline-flex cursor-pointer items-center justify-center rounded-lg bg-academyBlue px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Register Interest
        </Link>
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Full name
            <input className="rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-academyBlue focus:ring-2 focus:ring-blue-100" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Email
            <input className="rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-academyBlue focus:ring-2 focus:ring-blue-100" type="email" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Phone number
            <input className="rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-academyBlue focus:ring-2 focus:ring-blue-100" type="tel" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Message
            <textarea className="min-h-36 rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-academyBlue focus:ring-2 focus:ring-blue-100" required />
          </label>
          <button className="cursor-pointer rounded-lg bg-academyBlue px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700" type="submit">
            Send Message
          </button>
          {submitted && <p className="rounded-lg bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800">Thank you. Your message has been received.</p>}
        </form>
      </section>
    </main>
  );
}
