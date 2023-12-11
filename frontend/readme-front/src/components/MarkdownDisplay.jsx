import React from 'react';
import ReactMarkdown from 'react-markdown';
import Button from 'react-bootstrap/Button';

function MarkdownDisplayComponent({ data }) {
  return (
    <div className="markdown-container">
       <Button variant="primary" type="submit" >Update Readme</Button>
       <Button variant="primary" type="submit" >Delete Readme</Button><br></br>
      <ReactMarkdown>{data}</ReactMarkdown>
    </div>
  );
}

export default MarkdownDisplayComponent;
