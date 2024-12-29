import React, { useState } from 'react';

const CopyButton = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
      const textContent = Array.from(elements).map(el => {
        if (el.tagName.startsWith('H')) {
          const level = el.tagName[1];
          const hashes = '#'.repeat(parseInt(level));
          return `${hashes} ${el.textContent}\n`;
        }
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
      className="group absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 bg-white hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800 transition-all leading-none"
    >
      <svg 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100 relative top-[0.5px]"
      >
        <path 
          d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      <span className="inline-block">{copied ? 'Copied!' : 'Copy page'}</span>
    </button>
  );
};

export default CopyButton;