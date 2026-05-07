import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-blue-500/20 bg-gradient-to-r from-[#02091f] via-[#031347] to-[#07266f]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-right opacity-35" />
      <img
        src={logo}
        alt=""
        className="pointer-events-none absolute right-[9%] top-8 hidden w-[34rem] object-contain opacity-25 drop-shadow-[0_0_55px_rgba(37,99,235,0.45)] saturate-150 contrast-125 md:block"
      />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 md:px-8 md:py-16">
        <div className="text-white">
          <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
            SAFE ZONE
            <br />
            SECURITY <span className="text-academyBlue">ACADEMY</span>
          </h1>
          <p className="mt-4 text-3xl font-bold text-blue-400">YOUR SAFETY, OUR MISSION</p>
          <p className="mt-4 max-w-xl text-lg text-white/90">
            Professional security training built on discipline, integrity, and excellence. Empowering the next generation of security professionals across Quebec and Canada.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="cursor-pointer rounded-lg bg-academyBlue px-8 py-3 font-semibold transition hover:bg-blue-700" to="/register">
              Register Now
            </Link>
            <Link className="cursor-pointer rounded-lg border border-white/40 px-8 py-3 font-semibold transition hover:border-blue-300 hover:text-blue-200" to="/courses">
              View Courses
            </Link>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-white/90">
            <MapPin className="h-4 w-4" /> Proudly training security professionals in Quebec, Canada
          </p>
        </div>
      </div>
    </section>
  );
}
