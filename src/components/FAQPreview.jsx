import { ChevronDown } from 'lucide-react';

const q = [
'How long does it take to complete the Security Guard course?',
'Are your certifications recognized in Quebec?',
'Do you offer online or hybrid training?',
'What are the requirements to register?',
];
export function FAQPreview(){return <section className="mt-8"><div className="mb-3 flex items-center justify-between"><h2 className="text-3xl font-extrabold">FAQ PREVIEW</h2><a className="text-sm font-semibold text-academyBlue">View All FAQs →</a></div><div className="grid gap-3 md:grid-cols-2">{q.map(i=><button key={i} className="flex items-center justify-between rounded-lg border bg-white p-4 text-left">{i}<ChevronDown className="h-4 w-4"/></button>)}</div></section>}
