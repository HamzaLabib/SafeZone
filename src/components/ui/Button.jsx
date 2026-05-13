import { Link } from 'react-router-dom';

const baseClasses =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const variants = {
  primary: 'bg-academyBlue text-white hover:bg-blue-700 focus-visible:outline-academyBlue',
  secondary: 'bg-white text-academyNavy hover:bg-blue-50 focus-visible:outline-white',
  outline: 'border border-slate-300 bg-white text-slate-900 hover:border-academyBlue hover:text-academyBlue focus-visible:outline-academyBlue',
  outlineDark:
    'border border-white/35 bg-transparent text-white hover:border-blue-300 hover:text-blue-200 focus-visible:outline-white',
  ghost: 'text-academyBlue hover:text-blue-700 focus-visible:outline-academyBlue',
  dark: 'bg-academyNavy text-white hover:bg-slate-950 focus-visible:outline-academyNavy',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

function getClassName({ variant, size, className }) {
  return [baseClasses, variants[variant] || variants.primary, sizes[size] || sizes.md, className].filter(Boolean).join(' ');
}

export function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...props }) {
  const buttonClassName = getClassName({ variant, size, className });

  if (to) {
    return (
      <Link to={to} className={buttonClassName} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={buttonClassName} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
}
