import { useEffect, useState } from "react";
import axios from "axios";
import MarkdownDisplayComponent from "../components/MarkdownDisplay";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useOutletContext } from 'react-router-dom';


export default function Results() {
    const [readmeData, setReadmeData] = useState('');
    const [readmeId, setreadmeId] = useState('');
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, setIsAuthenticated, isUsername, setIsUsername } = useOutletContext();
    useEffect(() => {
        const getReadme = async (e) => {
            try {
                setLoading(true);
            const token = localStorage.getItem('token');
            let response = await axios.get(`http://127.0.0.1:8000/api/v1/readme/latest-readme/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                    }
            })
            console.log(response)
            console.log(response.data.id)
            setReadmeData(response.data.content);
            setreadmeId(response.data.id)
            setLoading(false);
            } catch (error) {
                console.log(error)
            }
        };
        getReadme();
    }, [])
    
    if (loading) {
        return <PacmanLoader size={500} color="#800080"/>;
    }
    
    return (
        <>
          <MarkdownDisplayComponent data={readmeData} id={readmeId}/>
        </>
    )
}
