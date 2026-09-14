function Card({
  title,
  subtitle,
  icon: Icon,
  children,
  mode
}) {
  return (
    <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-on-surface-variant uppercase">
            {title}
          </p>

          <p className={`mt-1 text-xl font-bold ${mode == "alert" ? "text-error" : "text-primary"}`}>
            {subtitle}
          </p>
        </div>

        <div className={`flex h-10 w-10 items-center justify-center rounded ${mode == "alert" ? "bg-error-container" : mode == "info" ? "bg-inverse-on-surface" : "bg-primary-fixed"}`}>
          <Icon
            size={20}
            className={mode == "alert" ? "text-error" : mode == "info" ? "text-on-surface" : "text-on-primary-fixed-variant"}
          />
        </div>
      </div >

      {/* Body */}
      <div className="" >
        {children}
      </div >
    </div >
  );
}

export default Card;