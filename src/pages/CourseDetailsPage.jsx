import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getCourseById } from '../data/courses';
import { useLogoFallback } from '../utils/imageFallback';

function DetailList({ title, items }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-academyBlue" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CourseDetailsPage() {
  const { courseId } = useParams();
  const course = getCourseById(courseId);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <Link to="/courses" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-academyBlue hover:text-blue-700">
        <ArrowLeft className="h-4 w-4" />
        Back to courses
      </Link>
      <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <img src={course.image} className="h-72 w-full rounded-lg object-cover shadow-sm" alt="" onError={useLogoFallback} />
          <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">{course.level}</p>
            <h1 className="mt-2 text-4xl font-extrabold text-slate-950">{course.title}</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">{course.shortDescription}</p>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <DetailList title="What students will learn" items={course.learn} />
            <DetailList title="Who this course is for" items={course.audience} />
            <DetailList title="Requirements" items={course.requirements} />
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Course support</h2>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Students receive guidance on attendance, expectations, course preparation, and next steps for security-sector readiness.
              </p>
            </section>
          </div>
        </div>
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Course Summary</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
              <dt className="font-semibold text-slate-500">Duration</dt>
              <dd className="text-right font-bold text-slate-950">{course.duration}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
              <dt className="font-semibold text-slate-500">Level</dt>
              <dd className="text-right font-bold text-slate-950">{course.level}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-semibold text-slate-500">Price</dt>
              <dd className="text-right font-bold text-slate-950">{course.price}</dd>
            </div>
          </dl>
          <Link
            to={`/register?course=${course.id}`}
            className="mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-lg bg-academyBlue px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Enroll / Register
          </Link>
          <Link
            to="/contact"
            className="mt-3 inline-flex w-full cursor-pointer items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-academyBlue hover:text-academyBlue"
          >
            Ask a Question
          </Link>
        </aside>
      </section>
    </main>
  );
}
