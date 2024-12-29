import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const CopyButton = ({ contentRef }) => {
  const [copied, setCopied] = useState(false);

  const copyContent = async () => {
    if (!contentRef.current) return;

    // Get all text content while preserving structure
    let content = '';
    const elements = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, blockquote');
    
    elements.forEach(el => {
      // Add headers with proper formatting
      if (el.tagName.startsWith('H')) {
        content += '\n' + '#'.repeat(parseInt(el.tagName[1])) + ' ' + el.textContent + '\n';
      }
      // Add paragraphs with spacing
      else if (el.tagName === 'P') {
        content += '\n' + el.textContent + '\n';
      }
      // Add list items with bullets
      else if (el.tagName === 'LI') {
        content += '- ' + el.textContent + '\n';
      }
      // Add blockquotes with formatting
      else if (el.tagName === 'BLOCKQUOTE') {
        content += '\n> ' + el.textContent + '\n';
      }
    });

    try {
      await navigator.clipboard.writeText(content.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <button
      onClick={copyContent}
      className="fixed bottom-4 right-4 flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm text-white shadow-lg hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
    >
      {copied ? (
        <>
          <Check size={16} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy size={16} />
          <span>Copy content</span>
        </>
      )}
    </button>
  );
};

export default CopyButton;