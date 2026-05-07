import { Hero } from '../components/Hero';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { CourseAndPortal } from '../components/CourseAndPortal';
import { FAQPreview } from '../components/FAQPreview';

export function HomePage() {
  return (
    <>
      <Hero />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <WhyChooseUs />
        <CourseAndPortal />
        <FAQPreview />
      </main>
    </>
  );
}
