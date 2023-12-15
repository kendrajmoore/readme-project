import { useEffect, useState } from "react";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import ReadmeCard from "../components/ReadmeCard";


export default function Results() {
    const [readmeData, setReadmeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const getReadme = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            let response = await axios.get(`http://127.0.0.1:8000/api/v1/readme/${username}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            setReadmeData(response.data);
            setLoading(false);
        } catch(err) {
            console.error('There was an error!', err);
        }
        
    }
    useEffect(() => {
        getReadme();
    }, [])

    if (loading) {
        return <PacmanLoader size={300} color="#800080"/>;
    }
    return (
        <>
            <h3 className="profile">Readmes</h3>
           { readmeData ? <div className="cards">
                {readmeData.map((r, idx) =>(
                    <ReadmeCard key={r.id} 
                    id={r.id}
                    repoName={r.repo_name} projectName={r.project_name} tools={r.tools} description={r.description} content={r.content} logo={r.logo_url}/>
                    
                ))}
            </div> : <h4>No Readmes Yet</h4> }
        </>
    )
}
