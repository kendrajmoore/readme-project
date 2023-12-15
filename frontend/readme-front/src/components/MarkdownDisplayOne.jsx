import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MarkdownDisplayOne() {
  const [readme, setReadme] = useState('');
  const { id } = useParams();
  const getReadme = async () => {
    const token = localStorage.getItem('token');
    let response = await axios.get(
      `http://127.0.0.1:8000/api/v1/readme/${id}`, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
      }
    );
    console.log(response)
    setReadme(response.data.content);
  };

  useEffect(() => {
    getReadme();
  }, []);
  return (
    <>
        <div className="markdown-container">
            <ReactMarkdown>{readme}</ReactMarkdown>
        </div>

    </>
  )
}

export default MarkdownDisplayOne