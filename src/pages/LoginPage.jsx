import { LockKeyhole, Mail, UserRound } from 'lucide-react';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { futureFeatures } from '../data/business';

export function LoginPage() {
  return (
    <>
      <Seo
        title="Student Portal Coming Soon"
        description="Safe Zone Security Academy student accounts are planned for a future backend release. Current visitors can register interest or contact admissions."
      />
      <main className="mx-auto max-w-5xl px-4 py-12 md:px-8">
        <Card className="overflow-hidden">
          <section className="bg-academyNavy p-8 text-white">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-200">
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
              Coming soon
            </p>
            <h1 className="mt-4 text-4xl font-extrabold">Student Portal Coming Soon</h1>
            <p className="mt-4 max-w-3xl leading-7 text-white/75">
              Student login is not active yet because this website does not currently have backend authentication. For launch safety, there is no fake login form and no fake account access.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/register" size="lg">
                Register Interest
              </Button>
              <Button to="/contact" variant="outlineDark" size="lg">
                Contact Admissions
              </Button>
            </div>
          </section>
          <section className="grid gap-4 p-6 md:grid-cols-3">
            {[
              { icon: UserRound, title: 'Future student accounts', text: 'Backend authentication is needed before students can log in securely.' },
              { icon: Mail, title: 'Current next step', text: 'Use registration or contact forms to prepare a request for admissions.' },
              { icon: LockKeyhole, title: 'Production-safe', text: 'The site does not accept passwords until a real account system exists.' },
            ].map(({ icon: Icon, title, text }) => (
              <article className="rounded-lg border border-slate-200 p-4" key={title}>
                <Icon className="h-5 w-5 text-academyBlue" aria-hidden="true" />
                <h2 className="mt-3 font-bold text-slate-950">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </section>
          <section className="border-t border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-bold text-slate-950">Planned portal features</h2>
            <ul className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              {futureFeatures.slice(0, 4).map((feature) => (
                <li key={feature}>- {feature}</li>
              ))}
            </ul>
          </section>
        </Card>
      </main>
    </>
  );
}
