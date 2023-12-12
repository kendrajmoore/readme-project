import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UpdateUserForm() {
  const [userData, setUserData] = useState({
    email: '',
    username: ''
  });
  const [showForm, setShowForm] = useState(true);
  const { isAuthenticated, setIsAuthenticated, isUsername, setIsUsername } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/v1/users/update/', {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        }); 
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put('http://localhost:8000/api/v1/users/update/', userData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const username = userData.username;
      setIsUsername(username);
      localStorage.setItem('username', username)
      if (response.status === 200) {
        setIsAuthenticated(true);
        setShowForm(false);
        navigate('/profile');
      } 
      console.log(response)
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!showForm) {
    return null; 
  }


  return (
    <>
      <div className='form'>
        <Form onSubmit={handleSubmit}>
          <h1 id ='title-form'>Update</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" value={userData.email} onChange={handleInputChange}type="email" placeholder={userData.email} />
            <Form.Text className="text-muted">
              Well never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" value={userData.username} onChange={handleInputChange} type="text" placeholder={userData.username} />
          </Form.Group>
   
          <Button variant="primary" type="submit">
            Submit
          </Button>
      </Form>
      </div>
    </>
  )
}

export default UpdateUserForm