import { useEffect, useState } from "react";
import axios from "axios";
import MarkdownDisplayComponent from "../components/MarkdownDisplay";
import Spinner from 'react-bootstrap/Spinner';


export default function Results() {
    const [readmeData, setReadmeData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const getReadme = async () => {
        try {
            setIsLoading(true)
            let response = await axios.get("http://127.0.0.1:8000/api/v1/readme/")
            console.log(response)
            setReadmeData(response.data.readme);
            setIsLoading(false) 
            console.log(response.data.readme);
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
