import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../assets/logo2.png";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


function Header() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:8000/api/v1/users/logout/', {}, {
      headers: {
        'Authorization': `Token ${token}` 
        }
      });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">
        <img
          alt=""
          src={Logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          />{' '} Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/login/">Login</Nav.Link>
            <Nav.Link href="/about/">About</Nav.Link>
          </Nav>
          <Button onClick={handleLogout} variant="danger" type="submit">
          Logout
        </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;