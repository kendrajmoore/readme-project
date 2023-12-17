import { useEffect, useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import UserProfileCard from "../components/UserProfileCard";
import axios from "axios";

function UserProfile() {
  const [profile, setProfile] = useState('');
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchGitHubProfile = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setProfile(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGitHubProfile();
  }, []);

  if (loading) {
    return <PacmanLoader size={300} color="#800080" />;
  }

  return (
    <>
    <h3 className="profile">Welcome to Readme Generator {username} </h3>
     <div className="img-container">
        <UserProfileCard profile={profile} name={profile.name} url={profile.avatar_url} local={profile.location} bio={profile.bio} login={profile.login} username={username} link={profile.html_url}/>
     </div>
    </>
  )
}

export default UserProfile;