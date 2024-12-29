import React, { useState } from 'react';

const CopyButton = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Get all headings and paragraphs
      const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
      
      // Convert to array and map to text content
      const textContent = Array.from(elements).map(el => {
        // For headings, add appropriate number of #
        if (el.tagName.startsWith('H')) {
          const level = el.tagName[1];
          const hashes = '#'.repeat(parseInt(level));
          return `${hashes} ${el.textContent}\n`;
        }
        // For paragraphs, just return the text content
        return `${el.textContent}\n`;
      }).join('\n');

      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-4 right-4 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded transition-colors"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

export default CopyButton;
