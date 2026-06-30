import { CourseCard } from './CourseCard';
import { SecurityProgramCard } from './SecurityProgramCard';
import { getFeaturedCourses } from '../data/courses';
import { securityProgram } from '../data/programs';
import { Button } from './ui/Button';
import { SectionHeader } from './ui/SectionHeader';

export function CourseAndPortal() {
  const featuredCourses = getFeaturedCourses();

  return (
    <section>
      <SectionHeader
        eyebrow="Main Security Program"
        title="Complete security training in one program"
        description="The main 70-hour Security Program includes the book, theoretical training, tactical training, and CNESST training."
        action={
          <Button to={`/programs/${securityProgram.programId}`} variant="ghost" size="sm">
            View Program
          </Button>
        }
      />
      <SecurityProgramCard program={securityProgram} />

      <div className="mt-12">
        <SectionHeader
          eyebrow="Individual courses"
          title="Separate courses remain available"
          description="SafeZone also offers individual courses separately from the main Security Program. Choose a focused course based on your training goal."
          action={
            <Button to="/courses" variant="ghost" size="sm">
              View All Courses
            </Button>
          }
        />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {featuredCourses.map((course) => (
          <CourseCard key={course.courseId} course={course} />
        ))}
      </div>
    </section>
  );
}
