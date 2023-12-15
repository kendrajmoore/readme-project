import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpdateReadmeForm from "./UpdateReadmeForm";

function MarkdownDisplayComponent({ data, id }) {
  const navigate = useNavigate();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  const handleDelete = async() => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:8000/api/v1/readme/delete/${id}/`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
        }
      });
      if (response.status === 204) {
        navigate('/');
      }  
    } catch(err) {
      console.error('There was an error!', err);
    }
    
  };

  const handlePush = async() => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8000/api/v1/github/push/${id}/`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        const showAlert = () => {
          alert('Succes');
        };
        showAlert();
      }  
    } catch(err) {
      console.error('There was an error!', err);
    }
    
  };

  return (
    <>
    <div>
        {showUpdateForm && (<UpdateReadmeForm id={id}/>)}
    </div>
    <div className="markdown-container">
       <Button variant="primary" type="submit" onClick={toggleUpdateForm}>Update Readme</Button>
       <Button variant="primary" type="submit" onClick={handleDelete}>Delete Readme</Button>
       <Button variant="primary" type="submit" onClick={handlePush}>Push Readme</Button><br></br>
      <ReactMarkdown>{data}</ReactMarkdown>
    </div>
    </>
  );
}

export default MarkdownDisplayComponent;
