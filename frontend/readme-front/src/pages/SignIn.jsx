import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SignIn() {
  const initialForm =  { email: '', password: '', username: ''};
  const [formData, setFormData] = useState(initialForm);
  const { isAuthenticated, setIsAuthenticated, isUsername, setIsUsername } = useOutletContext();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login/', formData);
      const username = formData.username;
      setIsUsername(username);
      localStorage.setItem('username', username)
      setFormData(initialForm);
      const token = response.data.token;
      localStorage.setItem('token', token);
      if (response.status === 201) {
        setIsAuthenticated(true);
        navigate('/profile');
      } 
    } catch (error) {
      navigate('/error')
      console.error('Error:', error);
    }
  };

  return (
    <div className='form'>
    <Form onSubmit={handleSubmit}>
      <h1 id ='title-form'>Login</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" value={formData.email} onChange={handleInputChange}type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          Well never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Username</Form.Label>
        <Form.Control name="username" value={formData.username} onChange={handleInputChange} type="text" placeholder="Github handle" />
      </Form.Group>
   
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" value={formData.password} onChange={handleInputChange} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <a href="/signup/">Sign Up</a>
    </Form>
    </div>
  );
}

export default SignIn