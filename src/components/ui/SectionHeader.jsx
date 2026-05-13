export function SectionHeader({ eyebrow, title, description, align = 'left', action }) {
  const centered = align === 'center';

  return (
    <div className={['mb-6 flex flex-col gap-4', centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'].join(' ')}>
      <div className={centered ? 'max-w-3xl' : 'max-w-3xl'}>
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">{eyebrow}</p>}
        <h2 className="mt-2 text-3xl font-extrabold text-slate-950 md:text-4xl">{title}</h2>
        {description && <p className="mt-3 leading-7 text-slate-600">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
