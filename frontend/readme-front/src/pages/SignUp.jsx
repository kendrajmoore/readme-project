import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

function SignUp() {
  const initialForm =  { email: '', password: '', username: ''};
  const [formData, setFormData] = useState(initialForm);
  const { isAuthenticated, setIsAuthenticated, isUsername, setIsUsername } = useOutletContext();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(setFormData)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/signup/', formData);
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
      console.log(response)
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
      <div className='form'>
      <Form onSubmit={handleSubmit}>
      <h1 id ='title-form'>Sign Up</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" type="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange} />
        <Form.Text className="text-muted">
          We never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Github Username</Form.Label>
        <Form.Control name="username" type="text" placeholder="Github Username" value={formData.username} onChange={handleInputChange} />
      </Form.Group>
   
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" value={formData.password} onChange={handleInputChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <a href="/login/">Sign In</a>
        </Form>
      </div>
    </>
  )
}

export default SignUp