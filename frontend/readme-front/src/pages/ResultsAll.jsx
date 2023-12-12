import { useEffect, useState } from "react";
import axios from "axios";
import MarkdownDisplayComponent from "../components/MarkdownDisplay";
import Spinner from 'react-bootstrap/Spinner';
import { useOutletContext } from 'react-router-dom';
import ReadmeCard from "../components/ReadmeCard";


export default function Results() {
    const [readmeData, setReadmeData] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated, setIsAuthenticated, isUsername, setIsUsername } = useOutletContext();
    const getReadme = async () => {
        try {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            console.log("result username: ", username)
            let response = await axios.get(`http://127.0.0.1:8000/api/v1/readme/${username}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.data)
            setReadmeData(response.data);
        } catch(err) {
            console.error('There was an error!', err);
        }
        
    }

    useEffect(() => {
        getReadme();
    }, [])
    return (
        <>
            <h3 className="profile">Readmes</h3>
            <div className="cards">
                {readmeData.map((r, idx) =>(
                    <ReadmeCard key={r.id} repoName={r.repo_name} projectName={r.project_name} tools={r.tools} description={r.description}/>
                ))}
            </div>
        </>
    )
}
