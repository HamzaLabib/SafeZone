import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { getCourseById } from '../data/courses';
import { businessInfo } from '../data/business';
import { useLogoFallback } from '../utils/imageFallback';

function DetailList({ title, items }) {
  return (
    <Card as="section" className="p-6">
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-academyBlue" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function CourseDetailsPage() {
  const { courseId } = useParams();
  const course = getCourseById(courseId);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription,
    provider: {
      '@type': 'Organization',
      name: businessInfo.name,
      url: businessInfo.baseUrl,
    },
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <Seo title={course.title} description={course.shortDescription} jsonLd={courseJsonLd} />
      <Link
        to="/courses"
        className="mb-6 inline-flex items-center gap-2 rounded text-sm font-semibold text-academyBlue hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academyBlue"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to courses
      </Link>
      <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <img
            src={course.image}
            className="h-72 w-full rounded-lg object-cover shadow-sm"
            alt={course.imageAlt || `${course.title} course image`}
            onError={useLogoFallback}
          />
          <Card className="mt-6 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">{course.category}</p>
            <h1 className="mt-2 text-4xl font-extrabold text-slate-950">{course.title}</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">{course.shortDescription}</p>
            <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="font-semibold text-slate-500">Duration</dt>
                <dd className="mt-1 font-bold text-slate-950">{course.duration}</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="font-semibold text-slate-500">Outcome</dt>
                <dd className="mt-1 font-bold text-slate-950">{course.outcome}</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="font-semibold text-slate-500">Format</dt>
                <dd className="mt-1 font-bold text-slate-950">{course.format}</dd>
              </div>
            </dl>
          </Card>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <DetailList title="What students will learn" items={course.learn} />
            <DetailList title="Who this course is for" items={course.audience} />
            <DetailList title="Requirements" items={course.requirements} />
            <Card as="section" className="p-6">
              <h2 className="text-xl font-bold text-slate-950">Course support</h2>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Students receive guidance on attendance, expectations, course preparation, and next steps for security-sector readiness. Admissions will confirm current schedule, pricing, and format before enrollment.
              </p>
            </Card>
          </div>
        </div>
        <Card as="aside" className="h-fit p-6 lg:sticky lg:top-6">
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
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
              <dt className="font-semibold text-slate-500">Schedule</dt>
              <dd className="text-right font-bold text-slate-950">{course.schedule}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
              <dt className="font-semibold text-slate-500">Format</dt>
              <dd className="text-right font-bold text-slate-950">{course.format}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-semibold text-slate-500">Price</dt>
              <dd className="text-right font-bold text-slate-950">{course.price}</dd>
            </div>
          </dl>
          <Button to={`/register?course=${course.id}`} className="mt-6 w-full">
            Register Interest
          </Button>
          <Button to="/contact" variant="outline" className="mt-3 w-full">
            Ask a Question
          </Button>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            Submitting interest does not complete enrollment. Admissions must confirm details first.
          </p>
        </Card>
      </section>
    </main>
  );
}
