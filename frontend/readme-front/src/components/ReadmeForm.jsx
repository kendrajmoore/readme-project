import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ReadmeForm() {
    return (
      <div className='form'>
      <Form>
        <h1>Readme Info</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            Well never share your email with anyone else.
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Github Name</Form.Label>
          <Form.Control type="text" placeholder="Github handle" />
        </Form.Group>
     
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <a href="/signup/">Sign Up</a>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
    );
  }

export default ReadmeForm