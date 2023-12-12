import { useEffect, useState } from "react";
import axios from "axios";
import MarkdownDisplayComponent from "../components/MarkdownDisplay";
import Spinner from 'react-bootstrap/Spinner';
import { useParams, useOutletContext } from 'react-router-dom';


export default function ResultsOne() {
    let { id } = useParams();
    const [readmeData, setReadmeData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated, setIsAuthenticated, isUsername, setIsUsername } = useOutletContext();
    const getReadme = async () => {
        try {
            setIsLoading(true)
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            console.log("result username: ", username);
            let response = await axios.get(`http://127.0.0.1:8000/api/v1/readme/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                  }
            })
            setReadmeData(response.data.content);
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
                <Spinner animation="border" variant="primary" /> : <MarkdownDisplayComponent data={readmeData}/>
            }
    
        </>
    )
}