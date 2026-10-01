export default function Input({ label, children, id }) {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <label className="font-semibold uppercase text-inverse-surface" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  )
}
