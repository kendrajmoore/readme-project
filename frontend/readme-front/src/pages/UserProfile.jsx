import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import CreateForm from "../components/CreateForm";

function UserProfile() {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <>
        <div>
            <h3>Welcome to the app</h3>
            <Button variant="primary" type="submit" onClick={toggleForm}>Create Readme</Button>
            {showForm && (<CreateForm/>)}
        </div>
    </>
  )
}

export default UserProfile