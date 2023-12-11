
import { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUsername, setIsUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      <Outlet context={{isAuthenticated, setIsAuthenticated, isUsername, setIsUsername}} />
      <Footer/>    
    </>
  )
}

export default App
