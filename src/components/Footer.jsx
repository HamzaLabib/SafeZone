import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Courses', to: '/courses' },
  { label: 'Register', to: '/register' },
  { label: 'Student Login', to: '/login' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

export function Footer() {
  return (
    <footer className="mt-10 bg-[#020a27] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4 md:px-8">
        <div>
          <Link to="/" className="mb-3 flex cursor-pointer items-center gap-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
            <img src="/logo.svg" className="h-12 w-12 rounded-full" alt="Safe Zone Security Academy logo" />
            <p className="font-bold">SAFE ZONE SECURITY ACADEMY</p>
          </Link>
          <p className="text-sm text-blue-300">YOUR SAFETY, OUR MISSION</p>
          <p className="mt-2 text-sm text-white/80">Professional security training. Real-world skills. Stronger communities.</p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Quick Links</h4>
          <ul className="space-y-1 text-sm text-white/90">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link className="inline-flex cursor-pointer rounded text-white/90 transition hover:text-blue-300" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Contact Us</h4>
          <ul className="space-y-2 text-sm text-white/90">
            <li>
              <a className="hover:text-blue-300" href="tel:+15145550123">
                (514) 555-0123
              </a>
            </li>
            <li>
              <a className="hover:text-blue-300" href="mailto:info@safezonesecurityacademy.ca">
                info@safezonesecurityacademy.ca
              </a>
            </li>
            <li>Montreal, QC, Canada</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Next Step</h4>
          <p className="text-sm text-white/80">Talk with us about course schedules, registration, and training options.</p>
          <Link
            to="/contact"
            className="mt-4 inline-flex cursor-pointer rounded-lg bg-academyBlue px-5 py-3 text-sm font-semibold transition hover:bg-blue-700"
          >
            Contact Admissions
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-3 text-center text-sm text-white/70">
        Copyright 2026 Safe Zone Security Academy. All Rights Reserved.{' '}
        <Link className="hover:text-blue-300" to="/privacy">
          Privacy Policy
        </Link>{' '}
        <span aria-hidden="true">|</span>{' '}
        <Link className="hover:text-blue-300" to="/terms">
          Terms of Use
        </Link>
      </div>
    </footer>
  );
}
