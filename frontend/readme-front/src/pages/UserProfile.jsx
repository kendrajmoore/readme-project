import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import CreateReadmeForm from "../components/CreateReadmeForm";
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const [showForm, setShowForm] = useState(false);
  const [profile, setProfile] = useState('');
  const { isAuthenticated, setIsAuthenticated, isUsername, setIsUsername } = useOutletContext();
  const navigate = useNavigate();
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const handleClick = () => {
    navigate('/readmes');  
  };
  const username = localStorage.getItem('username');
  return (
    <>
        <div>
            <h3 className="profile">Welcome to Readme Generator {username} </h3>
            <Button variant="primary" type="submit" onClick={toggleForm}>Create Readme</Button>
            <Button variant="primary" type="submit" onClick={handleClick}>Get Readmes</Button>
            <Button variant="primary" type="submit" onClick={handleClick}>Update User</Button>
            <Button variant="primary" type="submit" onClick={handleClick}>Delete User</Button>
            {showForm && (<CreateReadmeForm/>)}
        </div>
    </>
  )
}

export default UserProfile;