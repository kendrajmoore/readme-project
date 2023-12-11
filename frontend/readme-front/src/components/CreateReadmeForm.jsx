import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CreateForm() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [tools, setTools] = useState([]);
  const [reason, setReason] = useState([]);

  const createNewReadme = async(e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const prompt = `create a detailed readme for a github repo named ${repoName} for an open source project called ${projectName}. The project uses the following tools: ${tools}. It description: ${description}. ${reason}. Include sections about the badges, project, table of contents, built with, prerequisites, installation, usage, contributing, license.`;

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

    if (response.status === 201) {
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
            <input type="submit" value="create"/>
            </form>
        </div>
    </>
  )
}

export default CreateForm