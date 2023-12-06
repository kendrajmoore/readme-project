import React from 'react'
import ReadmeForm from '../components/ReadmeForm'
import Button from 'react-bootstrap/Button';

function UserProfile() {
  return (
    <>
        <div>
            <h3>Welcome to the app</h3>
            <h3>Github: </h3>
            <h3>Readme List: </h3>
            <Button variant="primary" type="submit">Submit</Button>
        </div>
        <ReadmeForm/>
    </>
  )
}

export default UserProfile