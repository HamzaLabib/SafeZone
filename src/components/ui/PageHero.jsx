import { Button } from './Button';

export function PageHero({ eyebrow, title, description, primaryAction, secondaryAction, children }) {
  return (
    <section className="bg-academyNavy text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-8 md:py-14 lg:grid-cols-[1fr_0.72fr] lg:items-center">
        <div>
          {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">{eyebrow}</p>}
          <h1 className="mt-2 text-4xl font-extrabold leading-tight md:text-5xl">{title}</h1>
          {description && <p className="mt-4 max-w-3xl text-lg leading-8 text-white/80">{description}</p>}
          {(primaryAction || secondaryAction) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {primaryAction && (
                <Button to={primaryAction.to} variant="primary" size="lg">
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button to={secondaryAction.to} variant="outlineDark" size="lg">
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>
        {children && <div>{children}</div>}
      </div>
    </section>
  );
}
