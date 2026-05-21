import { Card } from './ui/Card';
import { SectionHeader } from './ui/SectionHeader';

const trainingVisuals = [
  {
    title: 'Security Guard Training',
    text: 'Structured preparation for professional site awareness, observation, and conduct.',
    image: '/training-images/security-officer-male.jpg',
    alt: 'Male private security officer in a dark uniform holding a training folder in a classroom setting',
  },
  {
    title: 'Professional Readiness',
    text: 'Course support built around confidence, communication, and workplace expectations.',
    image: '/training-images/security-officer-female.jpg',
    alt: 'Female private security officer in a dark uniform reviewing training material in a classroom setting',
  },
  {
    title: 'Workplace Safety & Awareness',
    text: 'Scenario-focused learning for safer teams, facilities, and public-facing environments.',
    image: '/training-images/security-training-team.jpg',
    alt: 'Diverse security training team reviewing safety procedures with an instructor',
  },
];

export function ProfessionalTrainingVisuals() {
  return (
    <section className="mb-12">
      <SectionHeader
        align="center"
        eyebrow="Professional Security Training"
        title="Practical readiness for real security work"
        description="Students learn in a professional academy setting with training focused on responsibility, awareness, and clear communication."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {trainingVisuals.map((visual) => (
          <Card as="article" key={visual.title} className="overflow-hidden">
            <img
              src={visual.image}
              alt={visual.alt}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold text-slate-950">{visual.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{visual.text}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
