import { CourseAndPortal } from '../components/CourseAndPortal';
import { FAQPreview } from '../components/FAQPreview';
import { Hero } from '../components/Hero';
import { Seo } from '../components/Seo';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionHeader } from '../components/ui/SectionHeader';
import { businessInfo, enrollmentSteps } from '../data/business';

export function HomePage() {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: businessInfo.name,
    url: businessInfo.baseUrl,
    email: businessInfo.email,
    areaServed: businessInfo.serviceArea,
  };

  return (
    <>
      <Seo
        title="Security Training Built for Your Career"
        description="Safe Zone Security Academy helps students explore professional security training courses and connect with admissions for next steps."
        jsonLd={organizationJsonLd}
      />
      <Hero />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <WhyChooseUs />
        <CourseAndPortal />
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
              <h2 className="mt-2 text-3xl font-extrabold">Connect with admissions before launch details are finalized.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-white/75">
                Submit your course interest or ask a question. The current website prepares requests locally until email/database integration is connected.
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
