import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { jwtDecode } from 'jwt-decode';
import { API_ENDPOINT } from './api';
import './App.css';

function Login() {
  const navigate = useNavigate();

  // State variables
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Verify if User is in Session in LocalStorage
  useEffect(() => {
    const fetchUser = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = jwtDecode(token); // Decode the token to get user data
          setUser(response);
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error verifying user session:', error);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  // Handles Login Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_ENDPOINT}/auth/login`, {
        username,
        passwordx: password,
      });

      localStorage.setItem('token', JSON.stringify(response.data.token)); // Store token
      setError('');
      navigate('/dashboard');
    } catch (error) {
      setError('Enkkkk!!!');
    }
  };

  return (
    <div className="full-background dark-theme">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="home">Nike Outlet</Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />

      {/* Login Form */}
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}> {/* Increased column width to make the form bigger */}
            <div className="login-form">
              <div className="container">
                <div className="login-logo">
                  <img src="/nikebg.jpg" width="25%" alt="logo" /> {/* Made logo a bit bigger */}
                </div>
                <center style={{ color: '#ff0000' }}>
                  NIKE OUTLET: Find Your Style <br />
                </center>
                &nbsp;
                <div className="card bg-dark text-white" style={{ opacity: 0.85 }}>
                  {/* The card has a slight transparency with opacity */}
                  <div className="card-body login-card-body">
                    <form onSubmit={handleSubmit}>
                      <Form.Group controlId="formUsername">
                        <Form.Label style={{ color: '#fff', fontSize: '1.1rem' }}>Username:</Form.Label>
                        <Form.Control
                          className="form-control-sm rounded-0"
                          type="text"
                          placeholder="Enter Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          style={{
                            backgroundColor: 'rgba(52, 58, 64, 0.7)', // Transparent background
                            color: '#fff', // White text
                            borderColor: '#495057', // Lighter border
                            height: '45px', // Increased height for input fields
                            fontSize: '1.1rem', // Larger font size
                          }}
                        />
                      </Form.Group>
                      <Form.Group controlId="formPassword">
                        <Form.Label style={{ color: '#fff', fontSize: '1.1rem' }}>Password:</Form.Label>
                        <Form.Control
                          className="form-control-sm rounded-0"
                          type="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          style={{
                            backgroundColor: 'rgba(52, 58, 64, 0.7)', // Transparent background
                            color: '#fff', // White text
                            borderColor: '#495057', // Lighter border
                            height: '45px', // Increased height for input fields
                            fontSize: '1.1rem', // Larger font size
                          }}
                        />
                      </Form.Group>
                      <Form.Group controlId="formButton">
                        {error && <p style={{ color: '#ff0000', fontSize: '1.1rem' }}>{error}</p>}
                        <Button
                          variant="dark"
                          className="btn btn-block bg-custom btn-flat rounded-0"
                          size="lg" // Made the button larger
                          block
                          type="submit"
                          style={{
                            backgroundColor: '#333', // Darker button background
                            color: '#fff', // White text
                            padding: '12px 20px', // Larger padding
                            fontSize: '1.1rem', // Larger font size
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#444'} // Darker on hover
                          onMouseOut={(e) => e.target.style.backgroundColor = '#333'} // Return to original color
                        >
                          Login &nbsp; Now
                        </Button>
                      </Form.Group>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;