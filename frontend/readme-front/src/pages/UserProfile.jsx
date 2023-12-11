import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import CreateReadmeForm from "../components/CreateReadmeForm";
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const [showForm, setShowForm] = useState(false);
  const { isAuthenticated, setIsAuthenticated, isUsername, setIsUnsername } = useOutletContext();
  const navigate = useNavigate();
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const handleClick = () => {
    navigate('/readmes');  
  };
  return (
    <>
        <div>
            <h3 className="profile">Welcome to the app</h3>
            <Button variant="primary" type="submit" onClick={toggleForm}>Create Readme</Button><br></br>
            <Button variant="primary" type="submit" onClick={handleClick}>Get Readmes</Button>
            {showForm && (<CreateReadmeForm/>)}
        </div>
    </>
  )
}

export default UserProfile;