import { useState } from 'react'

export function CopyPageButton() {
  const [copied, setCopied] = useState(false)

  const copyPageContent = () => {
    // Get the main content of the page
    const content = document.querySelector('main')?.textContent || ''
    
    // Copy to clipboard
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={copyPageContent}
      className="fixed top-4 right-4 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
    >
      {copied ? '✅ Copied!' : '📋 Copy Page'}
    </button>
  )
} 
