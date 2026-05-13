import { Award, BookOpen, Clock3, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLogoFallback } from '../utils/imageFallback';

export function CourseCard({ course }) {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-academyBlue/50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-academyBlue focus:ring-offset-2"
    >
      <img
        src={course.image}
        className="h-40 w-full object-cover"
        alt={course.imageAlt || `${course.title} course image`}
        loading="lazy"
        onError={useLogoFallback}
      />
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-academyBlue">{course.category}</p>
        <h3 className="text-lg font-bold text-slate-950 group-hover:text-academyBlue">{course.title}</h3>
        <p className="mt-2 flex flex-wrap gap-4 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1">
            <Clock3 className="h-4 w-4 text-academyBlue" aria-hidden="true" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-academyBlue" aria-hidden="true" />
            {course.level}
          </span>
        </p>
        {course.outcome && (
          <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-slate-700">
            <Award className="h-4 w-4 text-academyBlue" aria-hidden="true" />
            {course.outcome}
          </p>
        )}
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{course.shortDescription}</p>
        <span className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-academyBlue px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-blue-700">
          View Course
          <MoveRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
