import { BriefcaseBusiness, FileCheck2, ShieldCheck, Users } from 'lucide-react';
import { trustIndicators } from '../data/business';
import { Card } from './ui/Card';
import { SectionHeader } from './ui/SectionHeader';

const icons = [ShieldCheck, BriefcaseBusiness, Users, FileCheck2];

export function WhyChooseUs() {
  return (
    <section className="mb-10">
      <SectionHeader
        align="center"
        eyebrow="Why Safe Zone"
        title="Training support built around career readiness"
        description="The launch site focuses on course discovery and admissions guidance while the student portal is prepared for a future backend."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
