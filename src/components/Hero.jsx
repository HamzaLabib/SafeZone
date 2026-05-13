import { MapPin } from 'lucide-react';
import { businessInfo } from '../data/business';
import { Button } from './ui/Button';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-blue-500/20 bg-academyNavy">
      <img
        src="/hero-security-training.jpg"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-70"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-academyNavy/90 via-academyNavy/65 to-academyNavy/25" aria-hidden="true" />
      <img
        src="/heavy-logo.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[18%] top-1/2 hidden w-[28rem] -translate-y-1/2 object-contain opacity-35 drop-shadow-[0_0_55px_rgba(37,99,235,0.55)] md:block"
      />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 py-12 md:px-8 md:py-20 lg:grid-cols-[1fr_0.55fr]">
        <div className="max-w-3xl text-white">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">{businessInfo.name}</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-6xl">
            Security Training Built for <span className="text-blue-300">Your Career</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">
            Professional security training for students preparing to build practical skills, understand workplace expectations, and take the next step toward security-sector opportunities.
          </p>
          {/* Professional security training built on discipline, integrity, and excellence. Empowering the next generation of security professionals across Quebec and Canada. */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/register" size="lg">
              Register Interest
            </Button>
            <Button to="/courses" variant="outlineDark" size="lg">
              View Courses
            </Button>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-white/90">
            <MapPin className="h-4 w-4" aria-hidden="true" /> Proudly training security professionals in {businessInfo.serviceArea}
          </p>
        </div>
        {/* <div className="hidden self-end rounded-lg border border-white/10 bg-white/10 p-5 text-white shadow-2xl backdrop-blur lg:block">
          <img src="/logo.svg" className="h-16 w-16 rounded-full bg-white" alt="Safe Zone Security Academy logo" />
          <p className="mt-5 text-sm uppercase tracking-wide text-blue-200">{businessInfo.tagline}</p>
          <p className="mt-2 text-2xl font-extrabold">Admissions-focused training guidance</p>
          <p className="mt-3 text-sm leading-6 text-white/75">
            Start with a course request. Admissions confirms schedule, format, pricing, and next steps before enrollment.
          </p>
        </div> */}
      </div>
    </section>
  );
}
