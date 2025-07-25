import React, { useState } from 'react';

const CodeBlock = ({ children }) => {
  // State to manage the button text for feedback
  const [copyText, setCopyText] = useState('Copy');

  const handleCopy = () => {
    // Create a temporary textarea element to hold the text
    const textArea = document.createElement('textarea');
    textArea.value = children.trim();
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      // Use the document.execCommand for broader compatibility
      document.execCommand('copy');
      setCopyText('Copied!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyText('Failed!');
    }

    // Clean up the temporary element
    document.body.removeChild(textArea);

    // Reset the button text after a short delay
    setTimeout(() => {
      setCopyText('Copy');
    }, 2000);
  };

  return (
    <div className="relative">
      <pre className="bg-gray-800 text-white rounded-lg p-4 pt-10 mt-4 overflow-x-auto text-sm">
        <code>{children.trim()}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white text-xs font-semibold py-1 px-3 rounded-md transition-colors"
      >
        {copyText}
      </button>
    </div>
  );
};

export default CodeBlock;