import React, { useRef } from 'react'
import { useConfig } from 'nextra-theme-docs'
import CopyButton from './CopyButton'

export default function PageContainer({ children }) {
  const contentRef = useRef(null)
  const config = useConfig()

  return (
    <div ref={contentRef} className="relative">
      {children}
      <CopyButton contentRef={contentRef} />
    </div>
  )
}