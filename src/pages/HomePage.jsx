import { Link } from 'react-router-dom';
import { CourseAndPortal } from '../components/CourseAndPortal';
import { FAQPreview } from '../components/FAQPreview';
import { Hero } from '../components/Hero';
import { WhyChooseUs } from '../components/WhyChooseUs';

export function HomePage() {
  return (
    <>
      <Hero />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <section className="mb-10 grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1.2fr_0.8fr] md:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">Professional security education</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Training built for real sites, real teams, and real responsibility.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Safe Zone Security Academy prepares students for disciplined, confident work in the security field through practical instruction,
              professional standards, and career-focused support.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 rounded-lg bg-slate-950 p-5 text-white">
            <p className="text-sm text-blue-200">Ready to begin?</p>
            <Link
              to="/register"
              className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-academyBlue px-5 py-3 text-sm font-semibold transition hover:bg-blue-700"
            >
              Register Interest
            </Link>
            <Link
              to="/courses"
              className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold transition hover:border-blue-300 hover:text-blue-200"
            >
              Browse Courses
            </Link>
          </div>
        </section>
        <WhyChooseUs />
        <CourseAndPortal />
        <FAQPreview />
      </main>
    </>
  );
}
