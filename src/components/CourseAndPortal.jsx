import { CourseCard } from './CourseCard';
import { getFeaturedCourses } from '../data/courses';
import { Button } from './ui/Button';
import { SectionHeader } from './ui/SectionHeader';

export function CourseAndPortal() {
  const featuredCourses = getFeaturedCourses();

  return (
    <section>
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
      <div className="grid gap-4 md:grid-cols-3">
        {featuredCourses.map((course) => (
          <CourseCard key={course.courseId} course={course} />
        ))}
      </div>
    </section>
  );
}
