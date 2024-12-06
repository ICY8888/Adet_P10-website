import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { jwtDecode } from 'jwt-decode';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [shoesImages, setShoesImages] = useState({
    shoe1: "/shoe.jpg",  // Default shoe image 1
    shoe2: "/shoe2.jpg",  // Default shoe image 2
    shoe3: "/shoe3.jpg",  // Default shoe image 3
  });
  const [apparelImages, setApparelImages] = useState({
    apparel1: "/shirt.jpg",  // Default apparel image 1
    apparel2: "/apparel.jpg",  // Default apparel image 2
    apparel3: "/apparel2.jpg",  // Default apparel image 3
  });
  const [accessoryImages, setAccessoryImages] = useState({
    accessory1: "/cap.jpg",  // Default accessory image 1
    accessory2: "/access.jpg",  // Default accessory image 2
    accessory3: "/access2.jpg",  // Default accessory image 3
  });
  const [descriptions, setDescriptions] = useState({
    shoe1: "NIKE KILLSHOT 2 PREMIUM",
    shoe2: "NIKE SHOX",
    shoe3: "NIKE SB X STUSSY",
    apparel1: "NIKE SB FLORAL SHIRT",
    apparel2: "NIKE WORLD CHAMPION SHIRT",
    apparel3: "NIKE X STUSSY SWEATPANTS",
    accessory1: "NIKE DADHAT",
    accessory2: "NIKE SKI MASK",
    accessory3: "NIKE WATCH",
  });
  const [activeSection, setActiveSection] = useState("");  // Track active section
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecodedUserID = () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error('Failed to verify session:', error);
        navigate('/login');
      }
    };
    fetchDecodedUserID();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Set fixed size for all images
  const imageStyle = {
    width: '400px',   // Set the width of all images to 200px
    height: 'auto',  // Set the height of all images to 200px
    objectFit: 'cover', // Ensure images are cropped to fill the container
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Optional: for styling
  };

  // Larger font size for product names
  const textStyle = {
    marginTop: "10px",
    color: "white", 
    fontSize: "18px",  // Increase font size here
    fontWeight: "bold",  // Optional: Make it bold
  };

  return (
    <>
      <Navbar bg="" expand="lg" variant="">
        <Container>
          <Navbar.Brand 
            href="/" 
            onClick={() => setActiveSection('')}  // Reset active section when clicking the logo
          >
            NIKE OUTLET.
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#Shoes" className="dark" onClick={() => setActiveSection('shoes')}>Shoes</Nav.Link>
              <Nav.Link href="#Apparel" className="dark" onClick={() => setActiveSection('apparel')}>Apparel</Nav.Link>
              <Nav.Link href="#Accessories" className="dark" onClick={() => setActiveSection('accessories')}>Accessories</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <NavDropdown
                title={user ? user.username : 'Account'}
                id="basic-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Add background styling */}
      <div style={{
        background: 'url("bgdashboard.jpg") no-repeat center center fixed',
        backgroundSize: 'cover',
        minHeight: '100vh',
        padding: '20px',
      }}>
        <Container>
          {/* Conditionally render the Categories Section */}
          {activeSection === '' && (
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              padding: "20px",
            }}>
              <div className="category-item" onClick={() => setActiveSection('shoes')}>
                <img src="/shoebg.jpg" alt="Shoes" style={imageStyle} />
                <h4 style={{ color: "white" || 'black' }}>Shoes</h4> {/* Default color black */}
              </div>
              <div className="category-item" onClick={() => setActiveSection('apparel')}>
                <img src="/shirt.jpg" alt="Apparel" style={imageStyle} />
                <h4 style={{ color: "white" || 'black' }}>Apparel</h4> {/* Default color black */}
              </div>
              <div className="category-item" onClick={() => setActiveSection('accessories')}>
                <img src="/cap.jpg" alt="Accessories" style={imageStyle} />
                <h4 style={{ color: "white" || 'black' }}>Accessories</h4> {/* Default color black */}
              </div>
            </div>
          )}

          {/* Conditionally render the Shoes Section */}
          {activeSection === 'shoes' && (
            <div>
              <h3 style={{ color: "white" || 'black' }}>Our Latest Shoes</h3> {/* Default color black */}
              <div style={{ display: "flex", justifyContent: "center", gap: "20px", }}>
                {/* Shoe 1 */}
                <div style={{ textAlign: "center" }}>
                  <img
                    src={shoesImages.shoe1}
                    alt="Shoe 1"
                    style={imageStyle}
                  />
                  <p style={textStyle}>{descriptions.shoe1}</p>  {/* Display shoe name below */}
                </div>

                {/* Shoe 2 */}
                <div style={{ textAlign: "center" }}>
                  <img
                    src={shoesImages.shoe2}
                    alt="Shoe 2"
                    style={imageStyle}
                  />
                  <p style={textStyle}>{descriptions.shoe2}</p>  {/* Display shoe name below */}
                </div>

                {/* Shoe 3 */}
                <div style={{ textAlign: "center" }}>
                  <img
                    src={shoesImages.shoe3}
                    alt="Shoe 3"
                    style={imageStyle}
                  />
                  <p style={textStyle}>{descriptions.shoe3}</p>  {/* Display shoe name below */}
                </div>
              </div>
            </div>
          )}

          {/* Conditionally render the Apparel Section */}
          {activeSection === 'apparel' && (
            <div>
              <h3 style={{ color: "white" || 'black' }}>Our Latest Apparel</h3> {/* Default color black */}
              <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                {/* Apparel 1 */}
                <div style={{ textAlign: "center" }}>
                  <img
                    src={apparelImages.apparel1}
                    alt="Apparel 1"
                    style={imageStyle}
                  />
                  <p style={textStyle}>{descriptions.apparel1}</p>  {/* Display apparel name below */}
                </div>

                {/* Apparel 2 */}
                <div style={{ textAlign: "center" }}>
                  <img
                    src={apparelImages.apparel2}
                    alt="Apparel 2"
                    style={imageStyle}
                  />
                  <p style={textStyle}>{descriptions.apparel2}</p>  {/* Display apparel name below */}
                </div>

                {/* Apparel 3 */}
                <div style={{ textAlign: "center" }}>
                  <img
                    src={apparelImages.apparel3}
                    alt="Apparel 3"
                    style={imageStyle}
                  />
                  <p style={textStyle}>{descriptions.apparel3}</p>  {/* Display apparel name below */}
                </div>
              </div>
            </div>
          )}

          {/* Conditionally render the Accessories Section */}
          {activeSection === 'accessories' && (
            <div>
              <h3 style={{ color: "white" || 'black' }}>Our Latest Accessories</h3> {/* Default color black */}
              <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                {/* Accessory 1 */}
                <div style={{ textAlign: "center" }}>
                  <img
                    src={accessoryImages.accessory1}
                    alt="Accessory 1"
                    style={imageStyle}
                  />
                  <p style={textStyle}>{descriptions.accessory1}</p>  {/* Display accessory name below */}
                </div>

                {/* Accessory 2 */}
                <div style={{ textAlign: "center" }}>
                  <img
                    src={accessoryImages.accessory2}
                    alt="Accessory 2"
                    style={imageStyle}
                  />
                  <p style={textStyle}>{descriptions.accessory2}</p>  {/* Display accessory name below */}
                </div>

                {/* Accessory 3 */}
                <div style={{ textAlign: "center" }}>
                  <img
                    src={accessoryImages.accessory3}
                    alt="Accessory 3"
                    style={imageStyle}
                  />
                  <p style={textStyle}>{descriptions.accessory3}</p>  {/* Display accessory name below */}
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

export default Dashboard;
