import React from 'react'

export default function FormRow({ children }) {
  return (
    <div className="grid grid-cols-12 gap-3">
      {children}
    </div>
  )
}
