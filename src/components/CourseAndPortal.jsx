import { CircleGauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CourseCard } from './CourseCard';
import { getFeaturedCourses } from '../data/courses';

const portalLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'My Courses', to: '/dashboard' },
  { label: 'Progress', to: '/dashboard' },
  { label: 'Certificates', to: '/dashboard' },
  { label: 'Account Settings', to: '/dashboard' },
  { label: 'Logout', to: '/login' },
];

export function CourseAndPortal() {
  const featuredCourses = getFeaturedCourses();

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-3xl font-extrabold">Featured Courses</h2>
          <Link className="cursor-pointer text-sm font-semibold text-academyBlue hover:text-blue-700" to="/courses">
            View All Courses
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
      <div>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-3xl font-extrabold">Student Portal Preview</h2>
          <Link className="cursor-pointer text-sm font-semibold text-academyBlue hover:text-blue-700" to="/dashboard">
            Open Dashboard
          </Link>
        </div>
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr]">
            <aside className="bg-[#031547] p-3 text-sm text-white">
              <ul className="grid grid-cols-2 gap-2 md:block md:space-y-2">
                {portalLinks.map((item) => (
                  <li key={item.label}>
                    <Link className="block cursor-pointer rounded px-2 py-1 text-white/90 transition hover:bg-blue-600/40 hover:text-white" to={item.to}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
            <div className="p-4">
              <div className="grid gap-2 md:grid-cols-4">
                {[
                  ['Enrolled Courses', '3'],
                  ['In Progress', '2'],
                  ['Certificates Earned', '1'],
                  ['Total Progress', '68%'],
                ].map(([label, value]) => (
                  <div className="rounded-lg border border-slate-200 p-2" key={label}>
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="text-xl font-bold">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-2 md:grid-cols-2">
                <div className="rounded-lg border border-slate-200 p-3">
                  <h4 className="font-semibold">Recent Activity</h4>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    <li>Completed: Security Awareness</li>
                    <li>In Progress: Security Guard Training</li>
                    <li>Upcoming: First Aid & CPR</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-slate-200 p-3">
                  <h4 className="font-semibold">Progress Overview</h4>
                  <div className="mt-5 flex items-center justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-[10px] border-blue-500 text-xl font-bold text-slate-700">
                      68%
                    </div>
                  </div>
                  <p className="mt-3 inline-flex items-center gap-2 text-sm">
                    <CircleGauge className="h-4 w-4 text-blue-500" /> On track
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
