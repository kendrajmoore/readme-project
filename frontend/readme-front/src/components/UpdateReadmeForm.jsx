import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function UpdateReadmeForm({ id }) {
    const navigate = useNavigate();
    const [readmeData, setReadmeData] = useState({
        projectName: '',
        repoName: '',
        description: '',
        tools: '',
        reason: ''
      });
  
    useEffect(() => {
        const updateReadme = async()=>{
            try {
                const token = localStorage.getItem('token');
                const response = await axios
                .get(`http://127.0.0.1:8000/api/v1/readme/update/${id}/`, {
                headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
                }
            });
                setReadmeData(response.data);
                if (response.status === 200) {
                  navigate('/readme');
                 }
                } catch(error) {
                    console.error('Error fetching readme data', error);
                }
            };
        updateReadme();
    }, []);

    const handleInputChange = (e) => {
        setReadmeData({ ...readmeData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
          const response = await axios.put(`http://localhost:8000/api/v1/readme/update/${id}/`, readmeData, {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json'
            }
          });
          if (response.status === 200) {
            navigate('/profile');
          } 
          console.log(response.status)
        } catch (error) {
          console.error('Error:', error);
        }
    };


  return (
    <>
        <div>
            <form onSubmit={handleSubmit}>
            <h2>Update a Readme</h2>
            <input
                type="text"
                name="project_name"
                placeholder={readmeData.projectName}
                value={readmeData.projectName}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="repo_name"
                value={readmeData.repoName}
                placeholder={readmeData.repoName}
                onChange={handleInputChange}
            />
            <textarea
                type="text"
                name="description"
                value={readmeData.description}
                placeholder={readmeData.description}
                onChange={handleInputChange}
            />
            <textarea
                type="text"
                name="tools"
                value={readmeData.tools}
                placeholder={readmeData.tools}
                onChange={handleInputChange}
            />
            <textarea
                type="text"
                name="reason"
                value={readmeData.reason}
                placeholder={readmeData.reason}
                onChange={handleInputChange}
            />
            <Button variant="primary" value="create"   type="submit">
                Create
            </Button>
            </form>
        </div>
    </>
  )
}

export default UpdateReadmeForm