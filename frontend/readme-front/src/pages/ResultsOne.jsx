import { useEffect, useState } from "react";
import axios from "axios";
import MarkdownDisplayComponent from "../components/MarkdownDisplay";
import { useParams } from 'react-router-dom';
import PacmanLoader from "react-spinners/PacmanLoader";


export default function ResultsOne() {
    let { id } = useParams();
    const [readmeData, setReadmeData] = useState('');
    const [loading, setLoading] = useState(false);
    const getReadme = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('token');
            let response = await axios.get(`http://127.0.0.1:8000/api/v1/readme/get/${id}`, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                  }
            })
            console.log(response)
            setReadmeData(response.data.content);
            setLoading(false) 
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
          <MarkdownDisplayComponent id={id} data={readmeData}/>
            
        </>
    )
}