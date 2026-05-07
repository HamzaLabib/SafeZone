import { Award, BookOpenCheck, CircleGauge, UserRound } from 'lucide-react';
import { courses } from '../data/courses';

const stats = [
  { label: 'My courses', value: '3', icon: BookOpenCheck },
  { label: 'Average progress', value: '68%', icon: CircleGauge },
  { label: 'Certificates', value: '1', icon: Award },
  { label: 'Profile status', value: 'Active', icon: UserRound },
];

export function DashboardPage() {
  const myCourses = courses.slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">Student dashboard</p>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-950">Welcome back.</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">Track course progress, certificates, and account information from one place.</p>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <article key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <Icon className="h-6 w-6 text-academyBlue" />
            <p className="mt-4 text-sm text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-950">{value}</p>
          </article>
        ))}
      </section>
      <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">My courses</h2>
          <div className="mt-5 space-y-4">
            {myCourses.map((course, index) => {
              const progress = [72, 45, 88][index];
              return (
                <article key={course.id} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-slate-950">{course.title}</h3>
                      <p className="text-sm text-slate-500">{course.duration}</p>
                    </div>
                    <span className="text-sm font-bold text-academyBlue">{progress}%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-academyBlue" style={{ width: `${progress}%` }} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="space-y-6">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">Certificates</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Security Awareness Certificate completed and ready for review.</p>
          </section>
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">Profile / Account</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Student</dt>
                <dd className="font-semibold text-slate-950">Safe Zone Student</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Email</dt>
                <dd className="font-semibold text-slate-950">student@example.com</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Status</dt>
                <dd className="font-semibold text-green-700">Active</dd>
              </div>
            </dl>
          </section>
        </div>
      </section>
    </main>
  );
}
