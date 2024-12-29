import React, { useState } from 'react';

const CopyButton = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Debug: Log what elements we find
      const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
      console.log('Found elements:', elements);

      // Debug: Log each element and its content
      elements.forEach(el => {
        console.log('Element:', el.tagName, 'Content:', el.textContent);
      });

      // Convert to array and map to text content
      const textContent = Array.from(elements).map(el => {
        if (el.tagName.startsWith('H')) {
          const level = el.tagName[1];
          const hashes = '#'.repeat(parseInt(level));
          const text = `${hashes} ${el.textContent}\n`;
          console.log('Heading formatted as:', text);  // Debug log
          return text;
        }
        const text = `${el.textContent}\n`;
        console.log('Paragraph formatted as:', text);  // Debug log
        return text;
      }).join('\n');

      console.log('Final text to copy:', textContent);  // Debug log

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