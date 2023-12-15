import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DisplayCard({ id, repoName, description, data}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/readme/${id}`);
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

export default DisplayCard