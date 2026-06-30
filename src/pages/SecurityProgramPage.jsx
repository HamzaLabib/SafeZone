import { ArrowLeft, Award, BookOpenCheck, CheckCircle2, Clock3, ShieldCheck, WalletCards } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { businessInfo } from '../data/business';
import { getSecurityProgramById } from '../data/programs';

export function SecurityProgramPage() {
  const { programId } = useParams();
  const program = getSecurityProgramById(programId);

  if (!program) {
    return <Navigate to="/courses" replace />;
  }

  const programJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.title,
    description: program.description,
    provider: {
      '@type': 'Organization',
      name: businessInfo.name,
      url: businessInfo.baseUrl,
    },
  };

  return (
    <>
      <Seo title={program.title} description={program.description} jsonLd={programJsonLd} image={program.image} />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <Link
          to="/courses"
          className="mb-6 inline-flex items-center gap-2 rounded text-sm font-semibold text-academyBlue hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academyBlue"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to programs and courses
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <Card className="overflow-hidden">
              <img src={program.image} alt={program.imageAlt} className="h-72 w-full object-cover" />
              <div className="p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">Main Program</p>
                <h1 className="mt-2 text-4xl font-extrabold text-slate-950 md:text-5xl">{program.title}</h1>
                <p className="mt-5 text-lg leading-8 text-slate-600">{program.description}</p>
                <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-950">
                  <ShieldCheck className="h-5 w-5 text-academyBlue" aria-hidden="true" />
                  {program.licenseStatement}
                </p>
              </div>
            </Card>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Card as="section" className="p-6">
                <h2 className="inline-flex items-center gap-2 text-xl font-bold text-slate-950">
                  <BookOpenCheck className="h-6 w-6 text-academyBlue" aria-hidden="true" />
                  Included
                </h2>
                <ul className="mt-4 space-y-3">
                  {program.included.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-academyBlue" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card as="section" className="p-6">
                <h2 className="inline-flex items-center gap-2 text-xl font-bold text-slate-950">
                  <Award className="h-6 w-6 text-academyBlue" aria-hidden="true" />
                  Certificate
                </h2>
                <p className="mt-4 text-sm leading-6 text-slate-700">{program.certificate}</p>
              </Card>
            </div>
          </div>

          <Card as="aside" className="h-fit p-6 lg:sticky lg:top-6">
            <h2 className="text-xl font-bold text-slate-950">Program Summary</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="inline-flex items-center gap-2 font-semibold text-slate-500">
                  <Clock3 className="h-4 w-4 text-academyBlue" aria-hidden="true" />
                  Duration
                </dt>
                <dd className="text-right font-bold text-slate-950">{program.duration}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="inline-flex items-center gap-2 font-semibold text-slate-500">
                  <WalletCards className="h-4 w-4 text-academyBlue" aria-hidden="true" />
                  Price
                </dt>
                <dd className="text-right text-lg font-extrabold text-slate-950">{program.displayPrice}</dd>
              </div>
            </dl>

            <Button to={`/register?course=${program.programId}`} className="mt-6 w-full">
              Register Interest
            </Button>
            <Button to="/contact" variant="outline" className="mt-3 w-full">
              Ask a Question
            </Button>
            <p className="mt-4 text-xs leading-5 text-slate-500">
              This is a registration interest request, not confirmed enrollment or an online payment. Admissions will confirm
              scheduling, format, availability, and next steps.
            </p>
          </Card>
        </section>
      </main>
    </>
  );
}
