import { Card } from './ui/Card';
import { SectionHeader } from './ui/SectionHeader';

const trainingVisuals = [
  {
    title: 'Security Guard Training',
    text: 'Structured security guard training in Quebec focused on professional site awareness, observation, and conduct.',
    image: '/training-images/security-indoor.png',
    alt: 'Security officer in a Montreal facility during professional security training',
  },
  {
    title: 'Professional Readiness',
    text: 'Course support built around confidence, communication, and workplace expectations.',
    image: '/training-images/securities-on-camera.png',
    alt: 'Security training students reviewing surveillance cameras in Montreal',
  },
  {
    title: 'Workplace Safety & Awareness',
    text: 'Scenario-focused learning for safer teams, facilities, and public-facing environments.',
    image: '/training-images/securities-indoor.png',
    alt: 'Quebec security officers practicing situational awareness in an indoor environment',
  },
  // {
  //   title: 'Mobile Patrol Presence',
  //   text: 'Field-focused training for visible patrol, professionalism, and site presence.',
  //   image: '/training-images/security-outdoor.png',
  //   alt: 'Safe Zone security officer standing in an outdoor patrol setting',
  // },
  // {
  //   title: 'Public-Facing Security',
  //   text: 'Preparation for calm, observant, and respectful work in public environments.',
  //   image: '/training-images/security-on-street.png',
  //   alt: 'Safe Zone security officer standing on a street in uniform',
  // },
];

export function ProfessionalTrainingVisuals() {
  return (
    <section className="mb-12 pt-8">
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
