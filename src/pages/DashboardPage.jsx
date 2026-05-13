import { Award, BookOpenCheck, CalendarClock, CircleGauge, LockKeyhole, Settings } from 'lucide-react';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { futureFeatures } from '../data/business';

const previewItems = [
  { title: 'Course enrollments', text: 'Students will see confirmed courses after authentication is implemented.', icon: BookOpenCheck },
  { title: 'Progress tracking', text: 'Lesson and completion progress will require real course activity data.', icon: CircleGauge },
  { title: 'Certificate access', text: 'Certificate downloads should only appear after admin-issued records exist.', icon: Award },
  { title: 'Schedule updates', text: 'Confirmed class dates can be shown once schedules are managed in a backend.', icon: CalendarClock },
  { title: 'Account settings', text: 'Profile updates need secure user sessions and validation.', icon: Settings },
  { title: 'Protected access', text: 'This preview is intentionally public, but real dashboards must be protected.', icon: LockKeyhole },
];

export function DashboardPage() {
  return (
    <>
      <Seo
        title="Student Dashboard Preview"
        description="Preview planned Safe Zone Security Academy student portal features. Real dashboards require backend authentication before launch."
      />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <Card className="bg-academyNavy p-8 text-white">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-200">
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
            Preview / Coming soon
          </p>
          <h1 className="mt-4 text-4xl font-extrabold">Student dashboard preview</h1>
          <p className="mt-4 max-w-3xl leading-7 text-white/75">
            This page no longer displays fake personal student data. It shows the planned portal structure only. Real access should be protected behind authentication.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button to="/register" size="lg">
              Register Interest
            </Button>
            <Button to="/contact" variant="outlineDark" size="lg">
              Contact Admissions
            </Button>
          </div>
        </Card>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {previewItems.map(({ title, text, icon: Icon }) => (
            <Card as="article" key={title} className="p-5">
              <Icon className="h-6 w-6 text-academyBlue" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold text-slate-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </Card>
          ))}
        </section>

        <Card as="section" className="mt-8 p-6">
          <h2 className="text-xl font-bold text-slate-950">Future implementation notes</h2>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-600 md:grid-cols-2">
            {futureFeatures.map((feature) => (
              <li key={feature}>- {feature}</li>
            ))}
          </ul>
        </Card>
      </main>
    </>
  );
}
