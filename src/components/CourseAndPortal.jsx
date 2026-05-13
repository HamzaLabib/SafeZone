import { Award, BookOpenCheck, CalendarClock, CircleGauge, LockKeyhole } from 'lucide-react';
import { CourseCard } from './CourseCard';
import { getFeaturedCourses } from '../data/courses';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { SectionHeader } from './ui/SectionHeader';

export function CourseAndPortal() {
  const featuredCourses = getFeaturedCourses();

  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <SectionHeader
          eyebrow="Featured courses"
          title="Start with the right training path"
          description="Explore practical programs designed for security readiness, emergency response, and professional development."
          action={
            <Button to="/courses" variant="ghost" size="sm">
              View All Courses
            </Button>
          }
        />
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
      <div>
        <SectionHeader
          eyebrow="Coming soon"
          title="Student portal preview"
          description="Future student accounts will help learners view enrolled courses, progress, certificates, and profile details after authentication is implemented."
        />
        <Card className="overflow-hidden">
          <div className="bg-academyNavy p-5 text-white">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-200">
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
              Preview only
            </p>
            <h3 className="mt-4 text-2xl font-extrabold">No student data is active yet</h3>
            <p className="mt-2 text-sm leading-6 text-white/75">
              This area is intentionally not connected to fake accounts. It is ready to become a real portal when backend authentication is added.
            </p>
          </div>
          <div className="grid gap-3 p-5 sm:grid-cols-2">
            {[
              { icon: BookOpenCheck, title: 'My Courses', text: 'View enrolled programs after login.' },
              { icon: CircleGauge, title: 'Progress', text: 'Track lessons and completion status.' },
              { icon: Award, title: 'Certificates', text: 'Access issued documents when available.' },
              { icon: CalendarClock, title: 'Schedules', text: 'Review confirmed course dates.' },
            ].map(({ icon: Icon, title, text }) => (
              <div className="rounded-lg border border-slate-200 p-4" key={title}>
                <Icon className="h-5 w-5 text-academyBlue" aria-hidden="true" />
                <h4 className="mt-3 font-bold text-slate-950">{title}</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 bg-slate-50 p-5">
            <Button to="/login" variant="outline" className="w-full">
              View Portal Status
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
