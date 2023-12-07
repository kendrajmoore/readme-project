import React from 'react';
import ReactMarkdown from 'react-markdown';

function MarkdownDisplayComponent({ data }) {
  return (
    <div className="markdown-container">
      <ReactMarkdown>{data}</ReactMarkdown>
    </div>
  );
}

export default MarkdownDisplayComponent;
