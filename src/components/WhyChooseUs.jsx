import { BookOpenCheck, Languages, MapPin, MessagesSquare, ShieldCheck } from 'lucide-react';
import { trustIndicators } from '../data/business';
import { Card } from './ui/Card';
import { SectionHeader } from './ui/SectionHeader';

const icons = [ShieldCheck, Languages, MessagesSquare, BookOpenCheck, MapPin];

export function WhyChooseUs() {
  return (
    <section className="mt-12">
      <SectionHeader
        align="center"
        eyebrow="Why choose Safe Zone"
        title="Professional security training with local support"
        description="A clear, student-focused approach to security career preparation in Montreal and across Quebec."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {trustIndicators.map(({ title, text }, index) => {
          const Icon = icons[index] || ShieldCheck;
          return (
          <Card as="article" key={title} className="p-5">
            <div className="mb-3 inline-flex rounded-full bg-blue-100 p-3 text-academyBlue">
              <Icon aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 text-slate-600">{text}</p>
          </Card>
          );
        })}
      </div>
    </section>
  );
}
