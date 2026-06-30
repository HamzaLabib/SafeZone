import { Award, BookOpenCheck, Clock3, MoveRight, ShieldCheck, WalletCards } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export function SecurityProgramCard({ program }) {
  return (
    <Card as="article" className="overflow-hidden border-blue-200 shadow-md">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative min-h-64 overflow-hidden bg-academyNavy">
          <img
            src={program.image}
            alt={program.imageAlt}
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-academyNavy via-academyNavy/50 to-transparent" aria-hidden="true" />
          <div className="relative flex h-full min-h-64 flex-col justify-end p-6 text-white md:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">Main Program</p>
            <h2 className="mt-2 text-3xl font-extrabold">{program.title}</h2>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-100">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              {program.licenseStatement}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <p className="leading-7 text-slate-600">{program.description}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                <Clock3 className="h-4 w-4 text-academyBlue" aria-hidden="true" />
                Duration
              </p>
              <p className="mt-1 text-xl font-extrabold text-slate-950">{program.duration}</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                <WalletCards className="h-4 w-4 text-academyBlue" aria-hidden="true" />
                Program price
              </p>
              <p className="mt-1 text-xl font-extrabold text-slate-950">{program.displayPrice}</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="inline-flex items-center gap-2 font-bold text-slate-950">
              <BookOpenCheck className="h-5 w-5 text-academyBlue" aria-hidden="true" />
              Included in the program
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {program.included.map((item) => (
                <li key={item} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 flex gap-2 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-slate-700">
            <Award className="mt-0.5 h-5 w-5 shrink-0 text-academyBlue" aria-hidden="true" />
            {program.certificate}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button to={`/programs/${program.programId}`}>
              View Security Program
              <MoveRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button to={`/register?course=${program.programId}`} variant="outline">
              Register Interest
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
