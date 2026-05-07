const nav = ['Home', 'About', 'Courses', 'Register', 'Student Login', 'FAQ', 'Contact'];

export function Navbar() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
      <div className="flex items-center gap-3">
        <img src="/logo.svg" className="h-12 w-12 rounded-full object-cover" alt="Safe Zone Security Academy logo" />
        <p className="text-sm font-semibold leading-tight text-white md:text-base">SAFE ZONE<br/>SECURITY ACADEMY</p>
      </div>
      <nav className="hidden items-center gap-8 text-sm text-white/95 lg:flex">{nav.map((n)=><a key={n} className="hover:text-blue-300" href="#">{n}</a>)}</nav>
      <button className="rounded-full bg-academyBlue px-5 py-2 text-sm font-semibold text-white">Register Now</button>
    </header>
  );
}
