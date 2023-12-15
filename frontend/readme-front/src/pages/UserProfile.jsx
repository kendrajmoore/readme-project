import { useEffect, useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import UserProfileCard from "../components/UserProfileCard";
import { useOutletContext } from 'react-router-dom';
import axios from "axios";

function UserProfile() {
  const [profile, setProfile] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, setIsAuthenticated, isUsername, setIsUsername } = useOutletContext();
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchGitHubProfile = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setProfile(response.data);
        setLoading(false);
        setError('');
      } catch (err) {
        setError('Error fetching GitHub profile');
        console.error(err);
      }
    };
    fetchGitHubProfile();
  }, []);

  if (loading) {
    return <PacmanLoader size={500} color="#800080" />;
  }

  return (
    <>
    <h3 className="profile">Welcome to Readme Generator {username} </h3>
     <div className="img-container">
        <UserProfileCard profile={profile} name={profile.name} url={profile.avatar_url} local={profile.location} bio={profile.bio} login={profile.login} username={username}/>
     </div>
    </>
  )
}

export default UserProfile;