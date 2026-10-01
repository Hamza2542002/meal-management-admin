export default function FormColumn({ col, children }) {
  return (
    <div className={`col-span-${col}`}>{children}</div>
  )
}
