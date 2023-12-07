import { useEffect, useState } from "react";
import axios from "axios";

function CreateForm() {
  const [projectName, setProjectName] = useState('');
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [tools, setTools] = useState([]);

  const createNewReadme = async(e) => {
    e.preventDefault();

    const data = { 
      projectName,
      repoName,
      description,
      tools
    };

    const response = await axios
      .post(`http://127.0.0.1:8000/api/v1/readme/`, data)
      .catch(err => console.log(err));

    console.log(response.data)

    if (response.status === 201) {
      window.location.reload();
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
            type="number"
            placeholder="Tools"
            onChange={(e) => setTools(e.target.value)}
            />
            <input type="submit" value="create"/>
            </form>
        </div>
    </>
  )
}

export default CreateForm