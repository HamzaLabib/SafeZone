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
          <div className="mb-7 inline-flex max-w-full items-center gap-4 sm:mb-8 sm:gap-5">
            <img
              src="/logo.svg"
              className="h-14 w-14 shrink-0 rounded-full object-cover drop-shadow-[0_3px_12px_rgba(0,0,0,0.5)] sm:h-16 sm:w-16 md:h-20 md:w-20"
              alt="Safe Zone Security Academy logo"
            />
            <p className="text-lg font-extrabold leading-tight tracking-[0.04em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-xl md:text-2xl">
              <span className="block">SAFE ZONE</span>
              <span className="mt-0.5 block">SECURITY ACADEMY</span>
            </p>
          </div>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Security Guard Training in <span className="text-blue-300">Montreal, Quebec</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">
            Safe Zone Security Academy helps students prepare for careers in security through professional training, practical guidance, and admissions support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/courses" size="lg">
              Explore Courses
            </Button>
            <Button to="/contact" variant="outlineDark" size="lg">
              Contact Admissions
            </Button>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-white/90">
            <MapPin className="h-4 w-4" aria-hidden="true" /> Quebec-focused security training in {businessInfo.location}
          </p>
        </div>
      </div>
    </section>
  );
}
