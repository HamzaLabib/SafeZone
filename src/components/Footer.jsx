import { Link } from 'react-router-dom';
import { businessInfo, futureFeatures } from '../data/business';
import { Button } from './ui/Button';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Courses', to: '/courses' },
  { label: 'Register', to: '/register' },
  { label: 'Student Portal', to: '/login' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

export function Footer() {
  return (
    <footer className="mt-10 bg-academyFooter text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4 md:px-8">
        <div>
          <Link to="/" className="mb-3 flex cursor-pointer items-center gap-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
            <img src="/logo.svg" className="h-12 w-12 rounded-full" alt="Safe Zone Security Academy logo" />
            <p className="font-bold uppercase">{businessInfo.name}</p>
          </Link>
          <p className="text-sm uppercase text-blue-300">{businessInfo.tagline}</p>
          <p className="mt-2 text-sm text-white/80">Professional security training. Real-world skills. Stronger communities.</p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Quick Links</h4>
          <ul className="space-y-1 text-sm text-white/90">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  className="inline-flex cursor-pointer rounded text-white/90 transition hover:text-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                  to={link.to}
                >
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
              {businessInfo.phoneHref ? (
                <a className="hover:text-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300" href={businessInfo.phoneHref}>
                  {businessInfo.phoneDisplay}
                </a>
              ) : (
                <span>{businessInfo.phoneDisplay}</span>
              )}
            </li>
            <li>
              <a className="hover:text-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300" href={`mailto:${businessInfo.email}`}>
                {businessInfo.email}
              </a>
            </li>
            <li>{businessInfo.location}</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Future-Ready</h4>
          <p className="text-sm text-white/80">The current launch version is built for course discovery and lead generation.</p>
          <p className="mt-2 text-xs text-white/60">{futureFeatures.slice(0, 3).join(' / ')}</p>
          <Button to="/contact" className="mt-4">
            Contact Admissions
          </Button>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-3 text-center text-sm text-white/70">
        Copyright 2026 {businessInfo.name}. All Rights Reserved.{' '}
        <Link className="hover:text-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300" to="/privacy">
          Privacy Policy
        </Link>{' '}
        <span aria-hidden="true">|</span>{' '}
        <Link className="hover:text-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300" to="/terms">
          Terms of Use
        </Link>
      </div>
    </footer>
  );
}
