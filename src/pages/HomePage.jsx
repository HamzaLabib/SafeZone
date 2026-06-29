import { CourseAndPortal } from '../components/CourseAndPortal';
import { FAQPreview } from '../components/FAQPreview';
import { Hero } from '../components/Hero';
import { ProfessionalTrainingVisuals } from '../components/ProfessionalTrainingVisuals';
import { Seo } from '../components/Seo';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionHeader } from '../components/ui/SectionHeader';
import { businessInfo, enrollmentSteps } from '../data/business';

export function HomePage() {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: businessInfo.name,
    url: businessInfo.baseUrl,
    email: businessInfo.email,
    areaServed: businessInfo.serviceArea,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montreal',
      addressRegion: 'QC',
      addressCountry: 'CA',
    },
  };

  return (
    <>
      <Seo
        title="Security Guard Training in Montreal, Quebec"
        description="Explore professional security guard training in Quebec with practical courses, Montreal-based admissions support, and guidance for a career in security."
        jsonLd={organizationJsonLd}
      />
      <Hero />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <section className="mb-12 grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">About Safe Zone</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-950">A Montreal-based security training academy</h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-600">
              Safe Zone Security Academy helps students prepare for security careers in Quebec. We focus on practical learning, professional standards, and clear security admissions support from the first inquiry to registration.
            </p>
          </div>
          <Button to="/about" variant="outline">
            Learn More About Us
          </Button>
        </section>
        <CourseAndPortal />
        <WhyChooseUs />
        <ProfessionalTrainingVisuals />
        <section className="mt-12">
          <SectionHeader
            align="center"
            eyebrow="Enrollment steps"
            title="A clear path from interest to training"
            description="Registration starts with a request. Admissions confirms the important details before any enrollment is treated as final."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {enrollmentSteps.map((step, index) => (
              <Card as="article" key={step.title} className="p-5">
                <p className="flex h-10 w-10 items-center justify-center rounded-full bg-academyBlue text-sm font-extrabold text-white">
                  {index + 1}
                </p>
                <h3 className="mt-4 text-xl font-bold text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
              </Card>
            ))}
          </div>
        </section>
        <FAQPreview />
        <section className="mt-12 overflow-hidden rounded-lg bg-academyNavy text-white">
          <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">Ready to take the next step?</p>
              <h2 className="mt-2 text-3xl font-extrabold">Ready to start your security training in Montreal?</h2>
              <p className="mt-3 max-w-3xl leading-7 text-white/75">
                Contact our admissions team today to discuss professional security training, course availability, and the next steps toward a career in security in Quebec.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/register" size="lg">
                Register Interest
              </Button>
              <Button to="/contact" variant="outlineDark" size="lg">
                Contact Admissions
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
