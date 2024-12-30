import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

function CopyPageButton() {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    // Grab all the main content from Nextra's content container
    const contentElement = document.querySelector('[data-nextra-container]')
    if (!contentElement) {
      console.error('Content element not found')
      return
    }
    const textToCopy = contentElement.innerText || ''
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Page content copied!')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(err => {
        console.error('Failed to copy page content', err)
      })
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        background: '#f5f5f5',
        cursor: 'pointer',
        zIndex: 100
      }}
    >
      {/* A small copy icon (Feather Icons "copy") */}
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 010-4h1m4-5V4a2 2 0 114 0v1"></path>
      </svg>
      <span>{copied ? 'Copied!' : 'Copy Page'}</span>
    </button>
  )
}

const config: DocsThemeConfig = {
  logo: <span>My Project</span>,
  project: {
    link: 'https://github.com/shuding/nextra-docs-template'
  },
  chat: {
    link: 'https://discord.com'
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    text: 'Nextra Docs Template'
  },

  // MAIN OVERRIDE:
  // Wrap all page content in a container so our "Copy Page" button
  // can be absolutely positioned at the top-right.
  main: ({ children }) => {
    return (
      <div style={{ position: 'relative' }}>
        <CopyPageButton />
        {children}
      </div>
    )
  }
}

export default config
