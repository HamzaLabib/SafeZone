import { Link } from 'react-router-dom';
import { CourseCard } from '../components/CourseCard';
import { courses } from '../data/courses';

export function CoursesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">All programs</p>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-950">Security Training Courses</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Choose practical training for security guard readiness, emergency response, supervision, and professional development.
          </p>
        </div>
        <Link
          to="/register"
          className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-academyBlue px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Register Interest
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </main>
  );
}
