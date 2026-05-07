import { GraduationCap, ShieldCheck, UsersRound } from 'lucide-react';

const values = [
  { title: 'Mission-led training', icon: ShieldCheck, text: 'We help students build the discipline, awareness, and judgment needed for responsible security work.' },
  { title: 'Professional instruction', icon: GraduationCap, text: 'Courses focus on practical skills, clear standards, and expectations students can carry into the field.' },
  { title: 'Community safety', icon: UsersRound, text: 'Our academy supports safer workplaces, events, and public spaces through stronger security education.' },
];

export function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">About Safe Zone</p>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-950">Professional security education with purpose.</h1>
          <p className="mt-4 leading-7 text-slate-600">
            Safe Zone Security Academy provides career-focused training for students preparing to enter or advance in the security industry.
            Our approach combines practical instruction, strong professional standards, and respect for the responsibility security personnel carry.
          </p>
          <p className="mt-4 leading-7 text-slate-600">
            From entry-level guard preparation to specialized safety and leadership training, our programs are built to help students become reliable,
            observant, and confident professionals.
          </p>
        </div>
        <div className="rounded-lg bg-slate-950 p-8 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">Your safety, our mission</p>
          <h2 className="mt-2 text-3xl font-extrabold">Training quality that respects the work.</h2>
          <p className="mt-4 leading-7 text-white/75">
            Security education should be practical, current, and grounded in real responsibility. That standard guides every course we offer.
          </p>
        </div>
      </section>
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {values.map(({ title, text, icon: Icon }) => (
          <article key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <Icon className="h-7 w-7 text-academyBlue" />
            <h2 className="mt-4 text-xl font-bold text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
