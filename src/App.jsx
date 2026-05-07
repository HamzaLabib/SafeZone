import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CourseAndPortal } from './components/CourseAndPortal';
import { FAQPreview } from './components/FAQPreview';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div>
      <div className="bg-academyNavy">
        <Navbar />
        <Hero />
      </div>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <WhyChooseUs />
        <CourseAndPortal />
        <FAQPreview />
      </main>
      <Footer />
    </div>
  );
}
