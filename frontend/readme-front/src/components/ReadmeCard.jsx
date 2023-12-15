import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ReadmeCard({ id, repoName, description }) {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/readme/get/${id}/`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
        <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
              <Card.Title>Repo Name: {repoName}</Card.Title>
              <Card.Text>
              Description: {description}
              </Card.Text>
                <Button variant="primary" onClick={handleClick}>View More</Button>
          </Card.Body>
        </Card>
    </>
  )
}

export default ReadmeCard