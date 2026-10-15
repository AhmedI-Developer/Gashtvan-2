import { cn } from '@/lib/cn'

const controlClass =
  'mt-1.5 w-full rounded-[16px] border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--accent)]'

export function Field({
  label,
  name,
  error,
  as = 'input',
  className,
  children,
  ...props
}) {
  const Comp = as

  return (
    <label className={cn('block text-sm font-semibold text-[var(--text)]', className)}>
      {label}
      {children || (
        <Comp
          name={name}
          className={cn(controlClass, error && 'border-red-400')}
          {...props}
        />
      )}
      {error ? <span className="mt-1 block text-xs font-medium text-red-400">{error}</span> : null}
    </label>
  )
}

export function CheckboxField({ label, name, checked, onChange, className }) {
  return (
    <label
      className={cn(
        'inline-flex cursor-pointer items-center gap-3 rounded-[16px] border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm font-semibold text-[var(--text)]',
        className,
      )}
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="size-4 accent-[var(--accent)]"
      />
      {label}
    </label>
  )
}

export { controlClass }
