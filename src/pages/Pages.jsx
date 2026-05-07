function SimplePage({ title }) {
  return <main className="mx-auto min-h-[50vh] max-w-7xl px-4 py-16 md:px-8"><h1 className="text-4xl font-extrabold text-academyNavy">{title}</h1></main>;
}

export const AboutPage = () => <SimplePage title="About Safe Zone Security Academy" />;
export const ContactPage = () => <SimplePage title="Contact Us" />;
export const RegisterPage = () => <SimplePage title="Register" />;
export const LoginPage = () => <SimplePage title="Student Login" />;
export const DashboardPage = () => <SimplePage title="Student Dashboard" />;
export const CoursesPage = () => <SimplePage title="All Courses" />;
export const CourseDetailPage = () => <SimplePage title="Security Guard Training" />;
