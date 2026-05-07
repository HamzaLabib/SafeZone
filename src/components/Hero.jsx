import { MapPin } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-blue-500/20 bg-gradient-to-r from-[#02091f] via-[#031347] to-[#07266f]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-right opacity-35" />
      <img src="/logo-shield.svg" alt="" className="pointer-events-none absolute right-[20%] top-16 hidden w-80 opacity-15 md:block"/>
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 md:px-8 md:py-16">
        <div className="text-white">
          <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">SAFE ZONE<br/>SECURITY <span className="text-academyBlue">ACADEMY</span></h1>
          <p className="mt-4 text-3xl font-bold text-blue-400">YOUR SAFETY, OUR MISSION</p>
          <p className="mt-4 max-w-xl text-lg text-white/90">Professional security training built on discipline, integrity, and excellence. Empowering the next generation of security professionals across Quebec and Canada.</p>
          <div className="mt-8 flex flex-wrap gap-4"><button className="rounded-xl bg-academyBlue px-8 py-3 font-semibold">Register Now</button><button className="rounded-xl border border-white/40 px-8 py-3 font-semibold">View Courses</button></div>
          <p className="mt-6 flex items-center gap-2 text-sm text-white/90"><MapPin className="h-4 w-4"/> Proudly Training Security Professionals in Quebec, Canada <span>🇨🇦</span></p>
        </div>
      </div>
    </section>
  );
}
