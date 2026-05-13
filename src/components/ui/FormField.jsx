const controlClassName =
  'w-full rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-academyBlue focus:ring-2 focus:ring-blue-100';

function FieldShell({ id, label, error, children }) {
  const errorId = `${id}-error`;

  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-slate-700" htmlFor={id}>
        {label}
      </label>
      {children({ errorId })}
      {error && (
        <p id={errorId} className="text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function InputField({ id, label, error, className = '', ...props }) {
  return (
    <FieldShell id={id} label={label} error={error}>
      {({ errorId }) => (
        <input
          id={id}
          className={[controlClassName, className].filter(Boolean).join(' ')}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
      )}
    </FieldShell>
  );
}

export function TextareaField({ id, label, error, className = '', ...props }) {
  return (
    <FieldShell id={id} label={label} error={error}>
      {({ errorId }) => (
        <textarea
          id={id}
          className={[controlClassName, 'min-h-36', className].filter(Boolean).join(' ')}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
      )}
    </FieldShell>
  );
}

export function SelectField({ id, label, error, children, className = '', ...props }) {
  return (
    <FieldShell id={id} label={label} error={error}>
      {({ errorId }) => (
        <select
          id={id}
          className={[controlClassName, 'cursor-pointer', className].filter(Boolean).join(' ')}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...props}
        >
          {children}
        </select>
      )}
    </FieldShell>
  );
}

export function CheckboxField({ id, label, error, className = '', ...props }) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label className="flex items-start gap-3 text-sm font-semibold text-slate-700" htmlFor={id}>
        <input
          id={id}
          className={['mt-1 h-4 w-4 rounded border-slate-300 text-academyBlue focus:ring-academyBlue', className]
            .filter(Boolean)
            .join(' ')}
          type="checkbox"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        <span>{label}</span>
      </label>
      {error && (
        <p id={errorId} className="mt-2 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
