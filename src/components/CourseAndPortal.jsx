import { CourseCard } from './CourseCard';
import { getFeaturedCourses } from '../data/courses';
import { Button } from './ui/Button';
import { SectionHeader } from './ui/SectionHeader';

export function CourseAndPortal() {
  const featuredCourses = getFeaturedCourses();

  return (
    <section>
      <SectionHeader
        eyebrow="Security courses in Montreal"
        title="Professional security training for your next step"
        description="Explore a security guard course in Montreal and related programs for Quebec licensing preparation, emergency response, and career development. Admissions can help you choose a suitable path."
        action={
          <Button to="/courses" variant="ghost" size="sm">
            View All Courses
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        {featuredCourses.map((course) => (
          <CourseCard key={course.courseId} course={course} />
        ))}
      </div>
    </section>
  );
}
