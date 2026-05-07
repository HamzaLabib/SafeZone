import { Link } from 'react-router-dom';

const nav = [
  ['Home', '/'],
  ['About', '/about'],
  ['Courses', '/courses'],
  ['Register', '/register'],
  ['Student Login', '/login'],
  ['FAQ', '/#faq'],
  ['Contact', '/contact'],
];

export function Navbar() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
      <Link to="/" className="flex items-center gap-3">
        <img src="/logo.svg" className="h-12 w-12 rounded-full object-cover" alt="Safe Zone Security Academy logo" />
        <p className="text-sm font-semibold leading-tight text-white md:text-base">SAFE ZONE<br/>SECURITY ACADEMY</p>
      </Link>
      <nav className="hidden items-center gap-8 text-sm text-white/95 lg:flex">{nav.map(([n,to])=><Link key={n} className="hover:text-blue-300" to={to}>{n}</Link>)}</nav>
      <Link to="/register" className="rounded-full bg-academyBlue px-5 py-2 text-sm font-semibold text-white">Register Now</Link>
    </header>
  );
}
