import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ReadmeCard({ id, repoName, description }) {
  const handleUpdateClick = async () => {
    try {
      const response = await axios.put(`/api/readme/update/${id}/`);
      console.log(response.data.content);
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
              <Link to={`/readme/${id}/`}>
                <Button variant="primary">View More</Button>
              </Link>
          </Card.Body>
        </Card>
    </>
  )
}

export default ReadmeCard