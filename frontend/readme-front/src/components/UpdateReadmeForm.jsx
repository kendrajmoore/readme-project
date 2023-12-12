import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function UpdateReadmeForm() {
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState('');
    const [repoName, setRepoName] = useState('');
    const [description, setDescription] = useState('');
    const [tools, setTools] = useState([]);
    const [reason, setReason] = useState([]);
    const updateReadme = async(e)=>{
        e.preventDefault();
        const token = localStorage.getItem('token');
        const requestBody = {
            prompt: prompt,
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

        if (response.status === 200) {
            setProjectName('');
            setRepoName('');
            setDescription('');
            setTools([]);
            setReason('');
            navigate('/readme');
        }
    }
  return (
    <>
        <div>
            <form onSubmit={e => updateReadme(e)}>
            <h2>Update a Readme</h2>
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
            <input type="submit" value="create"/>
            </form>
        </div>
    </>
  )
}

export default UpdateReadmeForm