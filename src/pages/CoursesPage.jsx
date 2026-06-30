import { useMemo, useState } from 'react';
import { CourseCard } from '../components/CourseCard';
import { SecurityProgramCard } from '../components/SecurityProgramCard';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeader } from '../components/ui/SectionHeader';
import { courses, getCourseCategories } from '../data/courses';
import { securityProgram } from '../data/programs';

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
        title="Security Program and Individual Courses in Montreal"
        description="Explore SafeZone Security Academy's main 70-hour Security Program and separate individual security courses in Montreal."
      />
      <PageHero
        eyebrow="Professional training in Quebec"
        title="Security Program and Individual Courses"
        description="Choose the complete 70-hour Security Program or explore separate individual courses for focused security training. The main program and individual courses remain available as distinct options."
        primaryAction={{ label: 'Register Interest', to: '/register' }}
        secondaryAction={{ label: 'Ask a Question', to: '/contact' }}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <section className="mb-12">
          <SectionHeader
            eyebrow="Main program"
            title="The complete Security Program"
            description="SafeZone's main program combines the book, theoretical training, tactical training, and CNESST training in one 70-hour program."
          />
          <SecurityProgramCard program={securityProgram} />
        </section>

        <section aria-labelledby="individual-courses-heading">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">Individual courses</p>
              <h2 id="individual-courses-heading" className="mt-2 text-3xl font-extrabold text-slate-950">
                Explore separate individual courses
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                These individual courses remain available separately from the main Security Program. Filter by course type and
                open any course page for full details.
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
        </section>
      </main>
    </>
  );
}
