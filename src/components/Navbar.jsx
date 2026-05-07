import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Login', to: '/login' },
];

function navClass({ isActive }) {
  return [
    'rounded-lg px-3 py-2 font-semibold transition hover:bg-white/10 hover:text-blue-200',
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
            SECURITY ACADEMY
          </p>
        </Link>
        <nav className="hidden items-center gap-1 text-sm lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} className={navClass} to={link.to} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Link
          to="/register"
          className="hidden cursor-pointer rounded-lg bg-academyBlue px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 lg:inline-flex"
        >
          Register Now
        </Link>
        <button
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-white/20 text-white transition hover:bg-white/10 lg:hidden"
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isOpen && (
        <nav className="mt-4 grid gap-2 rounded-lg border border-white/10 bg-[#031547] p-3 text-sm shadow-xl lg:hidden">
          {navLinks.map((link) => (
            <NavLink key={link.to} className={navClass} to={link.to} end={link.to === '/'} onClick={() => setIsOpen(false)}>
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/register"
            className="mt-2 cursor-pointer rounded-lg bg-academyBlue px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
            onClick={() => setIsOpen(false)}
          >
            Register Now
          </Link>
        </nav>
      )}
    </header>
  );
}
