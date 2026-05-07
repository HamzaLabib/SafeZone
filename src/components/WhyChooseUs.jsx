import { BriefcaseBusiness, ShieldCheck, Users, GraduationCap } from 'lucide-react';

const items = [
  { icon: ShieldCheck, title: 'Industry-Recognized Training', text: 'Certified programs aligned with Quebec and Canadian security industry standards.' },
  { icon: Users, title: 'Experienced Instructors', text: 'Learn from active security professionals with real-world experience.' },
  { icon: GraduationCap, title: 'Hands-On Learning', text: 'Practical training scenarios designed to build confidence and competence.' },
  { icon: BriefcaseBusiness, title: 'Career-Focused Support', text: 'Guidance, resources, and support to help you start and grow your security career.' },
];

export function WhyChooseUs() {
  return <section className="mb-10"><h2 className="mb-6 text-center text-4xl font-extrabold text-slate-800">WHY CHOOSE US</h2><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{items.map(({icon:Icon,title,text})=><article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-3 inline-flex rounded-full bg-blue-100 p-3 text-academyBlue"><Icon/></div><h3 className="text-xl font-bold">{title}</h3><p className="mt-2 text-slate-600">{text}</p></article>)}</div></section>;
}
