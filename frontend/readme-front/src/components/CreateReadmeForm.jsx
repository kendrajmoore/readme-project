import { useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';


function CreateForm() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [tools, setTools] = useState([]);
  const [reason, setReason] = useState([]);
  const [loading, setLoading] = useState(false);

  const createNewReadme = async(e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    const requestBody = {
      repoName: repoName,
      projectName: projectName,
      tools: tools,
      description: description,
      reason: reason
    };
  
    const response = await axios
      .post(`http://127.0.0.1:8000/api/v1/readme/`, requestBody,{
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      }).catch(err => console.log(err));

    if (response.status === 201) {
      setLoading(false);
      setProjectName('');
      setRepoName('');
      setDescription('');
      setTools([]);
      setReason('');
      navigate('/readme');
    } else {
      setLoading(false);
      navigate('/error');
    }
  
  }

  if (loading) {
    return <PacmanLoader size={300} color="#800080" />;
  }

  return (
    <>
        <div>
            <form onSubmit={e => createNewReadme(e)}>
              <h2>Create a Readme</h2>
              <input
                type="text"
                placeholder="Project Name"
                onChange={(e) => setProjectName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Repo Name"
                onChange={(e) => setRepoName(e.target.value)}
              />
              <textarea
                type="text"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <textarea
                type="text"
                placeholder="Tools"
                onChange={(e) => setTools(e.target.value)}
              />
              <textarea
                type="text"
                placeholder="Reason for Creating Project"
                onChange={(e) => setReason(e.target.value)}
              />
              <Button variant="primary" value="create"   type="submit">
              Create
              </Button>
            </form>
        </div>
    </>
  )
}

export default CreateForm