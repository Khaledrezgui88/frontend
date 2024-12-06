import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogoutIcon, ProfileIcon , ShopIcon} from "../../assets/icons/Icons.jsx";
import { logoutUser } from "../../redux/auth/auth.slice.js";
import { Alert, Button, OverlayTrigger, Tooltip, Badge, Modal } from 'react-bootstrap';
import { truncateText } from '../../assets/utils/helpers.js';

const Menu = () => {
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); 
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // TODO! njib token w na3mlo decoded w na3mel get user w  nhoto fi store fi useEffect
  // Retrieving current user from Redux state
  const currentUser = useSelector(state => state.auth.user);
  // Retrieving role from Redux state
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  // Retrieving cart from Redux state
  const cart = useSelector((state) => state.cart);

  const handleLogout = async () => {
      try {
        const resultAction = await dispatch(logoutUser()).unwrap();
        if (resultAction) {
          navigate("/login");
        }
      } catch {
        setError("Logout failed. Please try again.");
      }
  };

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#">Shop Ease</Navbar.Brand>
          <Nav>
            {/* Navigation links */}
            {!isAdmin ? (
              <>
                <Nav.Link onClick={() => navigate('/admin/examples')}>Examples</Nav.Link>
                <Nav.Link onClick={() => navigate('/admin/products')}>Products</Nav.Link>
                <Nav.Link onClick={() => navigate('/admin/users')}>Users</Nav.Link>
                <Nav.Link onClick={() => navigate('/admin/orders')}>Orders</Nav.Link>
                <Nav.Link onClick={() => navigate('/admin/categories')}>Category</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => navigate('/products')}>Products</Nav.Link>
                <Nav.Link onClick={() => navigate('/my-orders')}>My Orders</Nav.Link>

              </>
            )}
          </Nav>
          <Nav>
            {/* Displaying the user's profile picture and first name */}
            <Nav.Link onClick={() => navigate('/profile')} className="d-flex align-items-center">
              <div className="position-relative">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="logout">{currentUser?.firstName}</Tooltip>} // Display "full first name of current user " when hovered
                >
                  <div>
                    <span className="text-white me-2">{truncateText(currentUser?.firstName, 5)}</span>
                    <ProfileIcon />
                  </div>
                </OverlayTrigger>
              </div>
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/shop')} className="d-flex align-items-center">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="shop">Shop</Tooltip>} // Display "Shop" when hovered
                >
                  <div>
                    <ShopIcon />
                    <Badge bg="success" >
                      {cart.list.length}
                    </Badge>
                  </div>
                </OverlayTrigger>
            </Nav.Link>

          </Nav>
          <Nav>
          <Nav.Link onClick={handleShow}>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="logout">Logout</Tooltip>} // Display "Logout" when hovered
              >
                <Button
                  variant="outline-light"
                  style={{ width: '35px', height: '40px' }} // Adjust the width and height
                >
                  <LogoutIcon />
                </Button>
              </OverlayTrigger>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/*  Display an error message if there's an error */}
      {error && <Alert variant="danger">{error}</Alert>}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Are you sure you want to log out ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Menu;
