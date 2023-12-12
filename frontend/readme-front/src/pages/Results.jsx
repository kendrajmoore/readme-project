import { useEffect, useState } from "react";
import axios from "axios";
import MarkdownDisplayComponent from "../components/MarkdownDisplay";
import Spinner from 'react-bootstrap/Spinner';
import { useOutletContext } from 'react-router-dom';


export default function Results() {
    const [readmeData, setReadmeData] = useState('');
    const [readmeId, setreadmeId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated, setIsAuthenticated, isUsername, setIsUsername } = useOutletContext();
    const getReadme = async () => {
        try {
            setIsLoading(true)
            const token = localStorage.getItem('token');
            let response = await axios.get(`http://127.0.0.1:8000/api/v1/readme/latest-readme/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                  }
            })
            setReadmeData(response.data.content);
            setreadmeId(response.data.id)
            setIsLoading(false) 
        } catch(err) {
            console.error('There was an error!', err);
        }
        
    }

    useEffect(() => {
        getReadme();
    }, [])
    return (
        <>
            { isLoading ? 
                <Spinner animation="border" variant="primary" /> : <MarkdownDisplayComponent data={readmeData} id={readmeId}/>
            }
    
        </>
    )
}
