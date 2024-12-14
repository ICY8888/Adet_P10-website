import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './Dashboard.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_ENDPOINT = 'https://adet-cfbr.onrender.com/api'; // Replace with your actual API endpoint

function Dashboard() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);  // Changed 'employees' to 'users'
  const [form, setForm] = useState({
    fullname: '',
    username: '',
    passwordx: '',
  });
  const [validationError, setValidationError] = useState({});
  const [activeSection, setActiveSection] = useState('');
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    shoes: {
      shoe1: { img: "/shoe.jpg", description: "NIKE KILLSHOT 2 PREMIUM" },
      shoe2: { img: "/shoe2.jpg", description: "NIKE SHOX" },
      shoe3: { img: "/shoe3.jpg", description: "NIKE SB X STUSSY" },
    },
    apparel: {
      apparel1: { img: "/shirt.jpg", description: "NIKE SB FLORAL SHIRT" },
      apparel2: { img: "/apparel.jpg", description: "NIKE WORLD CHAMPION SHIRT" },
      apparel3: { img: "/apparel2.jpg", description: "NIKE X STUSSY SWEATPANTS" },
    },
    accessories: {
      accessory1: { img: "/cap.jpg", description: "NIKE DADHAT" },
      accessory2: { img: "/access.jpg", description: "NIKE SKI MASK" },
      accessory3: { img: "/access2.jpg", description: "NIKE WATCH" },
    },
  });

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

  // Fetch Users (formerly employees)
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${API_ENDPOINT}/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle Create User
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_ENDPOINT}/users`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      Swal.fire('Success', 'User created successfully', 'success');
      fetchUsers();
      setShowModal(false); // Close modal after successful creation
    } catch (error) {
      if (error.response?.status === 422) {
        setValidationError(error.response.data.errors);
      } else {
        Swal.fire('Error', error.response?.data?.message || 'An error occurred', 'error');
      }
    }
  };

  // Handle Update User
  const handleUpdateUser = async (userId) => {
    try {
      const updatedUser = { ...form }; // Set the form values here
      await axios.put(`${API_ENDPOINT}/users/${userId}`, updatedUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      Swal.fire('Success', 'User updated successfully', 'success');
      fetchUsers();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'An error occurred', 'error');
    }
  };

  // Handle Delete User
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${API_ENDPOINT}/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      Swal.fire('Success', 'User deleted successfully', 'success');
      fetchUsers();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'An error occurred', 'error');
    }
  };

  // Handle Section Change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Handle Create User Modal Show
  const handleShowModal = () => {
    setForm({ fullname: '', username: '', passwordx: '' }); // Reset form on modal show
    setShowModal(true);
  };

  // Handle Create User Modal Close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar bg="" expand="lg" variant="">
        <Container>
          <Navbar.Brand href="/" onClick={(e) => { e.preventDefault(); setActiveSection(''); }}>
            NIKE OUTLET.
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#Shoes" onClick={() => handleSectionChange('shoes')}>Shoes</Nav.Link>
              <Nav.Link href="#Apparel" onClick={() => handleSectionChange('apparel')}>Apparel</Nav.Link>
              <Nav.Link href="#Accessories" onClick={() => handleSectionChange('accessories')}>Accessories</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <NavDropdown title={user ? user.username : 'Account'} id="basic-nav-dropdown" align="end">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Item href="#Users" onClick={() => handleSectionChange('users')}>Users</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="dashboard-background">
        <Container>
          {activeSection === '' && (
            <div className="product-container">
              <div className="category-item" onClick={() => handleSectionChange('shoes')}>
                <img src="/shoebg.jpg" alt="Shoes" />
                <h4>Shoes</h4>
              </div>
              <div className="category-item" onClick={() => handleSectionChange('apparel')}>
                <img src="/shirt.jpg" alt="Apparel" />
                <h4>Apparel</h4>
              </div>
              <div className="category-item" onClick={() => handleSectionChange('accessories')}>
                <img src="/cap.jpg" alt="Accessories" />
                <h4>Accessories</h4>
              </div>
            </div>
          )}

          {activeSection === 'shoes' && (
            <div className="product-container">
              {Object.values(productData.shoes).map((shoe, index) => (
                <div key={index} className="product-item">
                  <img src={shoe.img} alt={shoe.description} />
                  <p>{shoe.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'apparel' && (
            <div className="product-container">
              {Object.values(productData.apparel).map((apparel, index) => (
                <div key={index} className="product-item">
                  <img src={apparel.img} alt={apparel.description} />
                  <p>{apparel.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'accessories' && (
            <div className="product-container">
              {Object.values(productData.accessories).map((accessory, index) => (
                <div key={index} className="product-item">
                  <img src={accessory.img} alt={accessory.description} />
                  <p>{accessory.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'users' && (  // Changed 'employees' to 'users'
            <div>
              <h3 className="section-header">Users</h3>
              <Button variant="success" className="mb-2" onClick={handleShowModal}>
                Create User
              </Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Fullname</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (  // Changed 'employees' to 'users'
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.fullname}</td>
                      <td>
                        <Button variant="warning" size="sm" onClick={() => setForm(user)}>Update</Button>{' '}
                        <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Container>
      </div>

      {/* Create/Update User Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{form?.id ? 'Update User' : 'Create User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={form?.id ? (e) => { e.preventDefault(); handleUpdateUser(form.id); } : handleCreateUser}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={form?.username || ''}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="fullname">
              <Form.Label>Fullname</Form.Label>
              <Form.Control
                type="text"
                value={form?.fullname || ''}
                onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="passwordx">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={form?.passwordx || ''}
                onChange={(e) => setForm({ ...form, passwordx: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              {form?.id ? 'Update' : 'Save'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Dashboard;
