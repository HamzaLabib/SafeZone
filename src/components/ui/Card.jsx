export function Card({ as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component className={['rounded-lg border border-slate-200 bg-white shadow-sm', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </Component>
  );
}
