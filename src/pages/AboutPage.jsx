import { BookOpenCheck, Eye, Languages, MapPin, MessagesSquare, ShieldCheck, Target } from 'lucide-react';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionHeader } from '../components/ui/SectionHeader';
import { businessInfo } from '../data/business';

const reasons = [
  {
    title: 'Quebec-Focused Training',
    icon: ShieldCheck,
    text: 'Our training is designed for students pursuing security careers in Quebec, with practical content focused on professional responsibilities and workplace readiness.',
  },
  {
    title: 'English & French Guidance',
    icon: Languages,
    text: 'Montreal students can contact admissions to confirm the English or French guidance currently available for registration and course planning.',
  },
  {
    title: 'Personalized Admissions Guidance',
    icon: MessagesSquare,
    text: 'From your first question to registration, our team explains course options, preparation, and next steps clearly.',
  },
  {
    title: 'Practical Learning Approach',
    icon: BookOpenCheck,
    text: 'Students learn more than theory, with professional security training focused on responsibility, communication, and situational awareness.',
  },
  {
    title: 'Local Montreal Focus',
    icon: MapPin,
    text: 'We are a Montreal-based academy committed to preparing responsible professionals who can contribute to safer communities across Quebec.',
  },
];

export function AboutPage() {
  return (
    <>
      <Seo
        title="About Our Montreal Security Training Academy"
        description="Learn how Safe Zone Security Academy provides Quebec-focused professional security training, practical career preparation, and personalized admissions support in Montreal."
      />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">About Safe Zone Security Academy</p>
            <h1 className="mt-2 text-4xl font-extrabold text-slate-950 md:text-5xl">Professional security education with purpose</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Safe Zone Security Academy is a Montreal-based security training academy dedicated to preparing the next generation of security professionals in Quebec.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              We provide practical, career-focused training designed to help students understand the responsibilities, expectations, and professional standards of the security field. Our team supports students throughout registration and admissions, making the journey clear and accessible from the first inquiry.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Whether students are beginning a career in security in Quebec or strengthening their knowledge in the field, we aim to provide a supportive learning environment built on professionalism, confidence, and community safety.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-blue-500/20 bg-academyNavy text-white shadow-sm">
            <img
              src="/training-images/security-outdoor.png"
              alt="Security professional in Montreal during Quebec-focused training"
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">Your safety, our mission</p>
              <h2 className="mt-2 text-3xl font-extrabold">Training quality that respects the work</h2>
              <p className="mt-4 leading-7 text-white/75">
                Security education should be practical and grounded in real responsibility. That standard guides our approach to every course.
              </p>
              <p className="mt-4 text-sm font-semibold text-blue-200">{businessInfo.location}</p>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <Card as="article" className="p-6 md:p-8">
            <Target className="h-8 w-8 text-academyBlue" aria-hidden="true" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-academyBlue">Our mission</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Prepare students for real responsibility</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Safe Zone Security Academy is committed to delivering accessible, high-quality security training that prepares students for real-world security responsibilities. Through professional instruction, practical learning, and personalized admissions support, we help students build the skills, confidence, and discipline needed to pursue a career in the security industry.
            </p>
          </Card>
          <Card as="article" className="p-6 md:p-8">
            <Eye className="h-8 w-8 text-academyBlue" aria-hidden="true" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-academyBlue">Our vision</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-950">A trusted Quebec training academy</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Our vision is to become one of Quebec’s most trusted security training academies, empowering students to protect people, property, and communities with confidence, competence, and integrity.
            </p>
          </Card>
        </section>

        <section className="mt-12">
          <SectionHeader
            align="center"
            eyebrow="Why choose Safe Zone"
            title="Student-focused training and support"
            description="Professional preparation, clear admissions guidance, and a local understanding of the path toward security work in Quebec."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {reasons.map(({ title, text, icon: Icon }) => (
              <Card as="article" key={title} className="p-5">
                <div className="inline-flex rounded-full bg-blue-100 p-3 text-academyBlue">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section lang="fr" className="mt-12 rounded-lg border border-blue-200 bg-blue-50 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">Renseignements en français</p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Formation agent de sécurité à Montréal</h2>
          <p className="mt-4 max-w-4xl leading-7 text-slate-700">
            Safe Zone Security Academy accompagne les étudiants qui souhaitent suivre une formation d’agent de sécurité au Québec. Notre école de sécurité à Montréal offre une formation en sécurité à Montréal axée sur les responsabilités professionnelles, la préparation au travail et le soutien à l’admission pour les étudiants qui veulent commencer une carrière en sécurité. Nos cours d’agent de sécurité et notre formation professionnelle en sécurité aident les étudiants à avancer vers les étapes du parcours de certification BSP au Québec, sous réserve de leur admissibilité et des exigences réglementaires applicables.
          </p>
        </section>

        <section className="mt-12 overflow-hidden rounded-lg bg-academyNavy p-6 text-white md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">Your next step</p>
              <h2 className="mt-2 text-3xl font-extrabold">Build your security career with clear guidance</h2>
              <p className="mt-3 max-w-3xl leading-7 text-white/75">
                Explore available courses or contact admissions to ask about schedules, preparation, language availability, and Quebec security guard licence requirements.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/courses" size="lg">Explore Courses</Button>
              <Button to="/contact" variant="outlineDark" size="lg">Contact Admissions</Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
