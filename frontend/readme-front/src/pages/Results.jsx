import { useEffect, useState } from "react";
import axios from "axios";
import MarkdownDisplayComponent from "../components/MarkdownDisplay";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Results() {
    const [readmeData, setReadmeData] = useState('');
    const [readmeId, setreadmeId] = useState('');
    const [loading, setLoading] = useState(false);
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
        return <PacmanLoader size={300} color="#800080"/>;
    }
    
    return (
        <>
          <MarkdownDisplayComponent data={readmeData} id={readmeId}/>
        </>
    )
}
