import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { businessInfo } from '../data/business';
import { Button } from './ui/Button';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
  { label: 'Student Portal', to: '/login' },
];

function navClass({ isActive }) {
  return [
    'rounded-lg px-3 py-2 font-semibold transition hover:bg-white/10 hover:text-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300',
    isActive ? 'bg-white/10 text-blue-200' : 'text-white/90',
  ].join(' ');
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="mx-auto max-w-7xl px-4 py-4 md:px-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex cursor-pointer items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-academyNavy"
          onClick={() => setIsOpen(false)}
        >
          <img src="/logo.svg" className="h-12 w-12 rounded-full object-cover" alt="Safe Zone Security Academy logo" />
          <p className="text-sm font-semibold leading-tight text-white md:text-base">
            SAFE ZONE
            <br />
            {businessInfo.name.replace('Safe Zone ', '').toUpperCase()}
          </p>
        </Link>
        <nav className="hidden items-center gap-1 text-sm lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} className={navClass} to={link.to} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Button to="/register" className="hidden lg:inline-flex">
          Register Now
        </Button>
        <button
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-white/20 text-white transition hover:bg-white/10 lg:hidden"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isOpen && (
        <nav className="mt-4 grid gap-2 rounded-lg border border-white/10 bg-academyPanel p-3 text-sm shadow-xl lg:hidden">
          {navLinks.map((link) => (
            <NavLink key={link.to} className={navClass} to={link.to} end={link.to === '/'} onClick={() => setIsOpen(false)}>
              {link.label}
            </NavLink>
          ))}
          <Button to="/register" className="mt-2" onClick={() => setIsOpen(false)}>
            Register Now
          </Button>
        </nav>
      )}
    </header>
  );
}
