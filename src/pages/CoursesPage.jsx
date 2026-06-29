import { useMemo, useState } from 'react';
import { CourseCard } from '../components/CourseCard';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { PageHero } from '../components/ui/PageHero';
import { courses, getCourseCategories } from '../data/courses';

export function CoursesPage() {
  const categories = getCourseCategories();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const visibleCourses = useMemo(
    () => (selectedCategory === 'All' ? courses : courses.filter((course) => course.category === selectedCategory)),
    [selectedCategory],
  );

  return (
    <>
      <Seo
        title="Security Guard Course in Montreal"
        description="Explore professional security training in Montreal, including Quebec-focused security guard preparation, first aid, loss prevention, de-escalation, and emergency response."
      />
      <PageHero
        eyebrow="Professional training in Quebec"
        title="Security Guard Courses in Montreal"
        description="Choose practical security training for Quebec licensing preparation, workplace readiness, emergency response, supervision, and professional development. Admissions will confirm schedule, pricing, format, and current requirements before enrollment."
        primaryAction={{ label: 'Register Interest', to: '/register' }}
        secondaryAction={{ label: 'Ask a Question', to: '/contact' }}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">Course catalog</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Find the course that fits your goal</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Filter by course type, review outcomes, and open a course page for full details.
            </p>
          </div>
          <Button to="/register">Register Interest</Button>
        </div>
        <div className="mb-6 flex flex-wrap gap-2" aria-label="Course category filters">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                className={[
                  'rounded-lg border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academyBlue',
                  isActive
                    ? 'border-academyBlue bg-academyBlue text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-academyBlue hover:text-academyBlue',
                ].join(' ')}
                aria-pressed={isActive}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            );
          })}
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleCourses.map((course) => (
            <CourseCard key={course.courseId} course={course} />
          ))}
        </div>
      </main>
    </>
  );
}
