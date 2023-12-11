import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ReadmeCard({ repoName, projectName, tools, description}) {
  return (
    <>
        <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
            <Card.Title>{repoName}</Card.Title>
            <Card.Text>
            {description}
            </Card.Text>
            <Button variant="primary">View More</Button>
        </Card.Body>
        </Card>
    </>
  )
}

export default ReadmeCard