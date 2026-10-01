function GeneralCard({ children }) {
  return (
    <div className="rounded-md border border-outline-variant bg-white p-4">
      {children}
    </div>
  )
}

function GeneralCardHeader({ title, headIcon: Icon }) {
  return (
    <div>
      <div className="flex items-center justify-start gap-2 mb-4 text-lg" >
        <Icon size={20} className="text-primary" />
        <p className="font-semibold text-inverse-surface uppercase">
          {title}
        </p>
      </div>
    </div>
  )
}

function GeneralCardBody({ children }) {
  return (
    <div className="text-sm text-on-surface-variant flex flex-col gap-5">
      {children}
    </div>
  )
}


export { GeneralCardHeader, GeneralCardBody, GeneralCard };