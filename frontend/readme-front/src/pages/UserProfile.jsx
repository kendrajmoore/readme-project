import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import CreateReadmeForm from "../components/CreateReadmeForm";
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function UserProfile() {
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { isAuthenticated, setIsAuthenticated, isUsername, setIsUsername } = useOutletContext();
  const navigate = useNavigate();
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };
  const handleClick = () => {
    navigate('/readmes');  
  };
  const username = localStorage.getItem('username');

  const handleDelete = async() => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:8000/api/v1/users/delete/${username}/`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setIsAuthenticated(false);
        navigate('/');
      }  
    } catch(err) {
      console.error('There was an error!', err);
    }
    
  };
  return (
    <>
        <div>
            <h3 className="profile">Welcome to Readme Generator {username} </h3>
            <Button variant="primary" type="submit" onClick={toggleForm}>Create Readme</Button>
            <Button variant="primary" type="submit" onClick={handleClick}>Get Readmes</Button>
            <Button variant="primary" type="submit" onClick={toggleUpdateForm}>Update User</Button>
            <Button variant="primary" type="submit" onClick={handleDelete}>Delete User</Button>
            {showForm && (<CreateReadmeForm/>)}
        </div>
    </>
  )
}

export default UserProfile;