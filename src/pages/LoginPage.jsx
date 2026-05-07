import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    window.setTimeout(() => {
      navigate('/dashboard');
    }, 250);
  }

  return (
    <main className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-lg bg-slate-950 p-8 text-white">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">Student login</p>
        <h1 className="mt-2 text-4xl font-extrabold">Access your training portal.</h1>
        <p className="mt-4 leading-7 text-white/75">
          Log in to continue courses, review progress, manage certificates, and update profile information.
        </p>
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Email
            <input className="rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-academyBlue focus:ring-2 focus:ring-blue-100" type="email" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Password
            <input className="rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-academyBlue focus:ring-2 focus:ring-blue-100" type="password" required />
          </label>
          <button className="cursor-pointer rounded-lg bg-academyBlue px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:bg-blue-400" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Opening Dashboard...' : 'Login'}
          </button>
          <p className="text-sm text-slate-600">
            Need an account?{' '}
            <Link className="font-semibold text-academyBlue hover:text-blue-700" to="/register">
              Create account
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
