import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext, useNavigate } from 'react-router-dom';
import CreateReadmeForm from "../components/CreateReadmeForm";
import UpdateUserForm from "../components/UpdateUserForm";

function UserProfileCard({ profile, name, url, local, bio, login }) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { isAuthenticated, setIsAuthenticated, isUsername, setIsUsername } = useOutletContext();
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

        <div className="profile-card">
            <img className="profile-card" src={url} alt="pic"/>
            <a href=""><h1>{name}</h1></a>
            <p className="profile-title">Location: {local}</p>
            <p>{bio}</p>
            <button className="profile-button" type="submit" onClick={toggleForm}>Create Readme</button>
            <button className="profile-button" type="submit" onClick={handleClick}>Get Readmes</button>
            <button className="profile-button" type="submit" onClick={toggleUpdateForm}>Update User</button>
            <button className="profile-button" type="submit" onClick={handleDelete}>Delete User</button>
        </div>
        <div>          
          {showForm && (<CreateReadmeForm/>)}
          {showUpdateForm && (<UpdateUserForm />)}
        </div>
    </>
  )
}

export default UserProfileCard