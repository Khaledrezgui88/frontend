import React from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer">
    <footer style={{ backgroundColor: "#343a40", color: "#fff", padding: "20px 0" }}>
      <Container>
        <Row>
          {/* Logo and Description */}
          <Col md={4} className="mb-4">
            <h5>ShopEase</h5>
            <p>
              Find the best deals on quality products. Fast delivery and 24/7 customer service.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-4">
            <h5>Quick Links</h5>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ backgroundColor: "transparent", border: "none", padding: "5px 0" }}>
                <a href="/about" style={{ color: "#fff", textDecoration: "none" }}>About Us</a>
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: "transparent", border: "none", padding: "5px 0" }}>
                <a href="/contact" style={{ color: "#fff", textDecoration: "none" }}>Contact</a>
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: "transparent", border: "none", padding: "5px 0" }}>
                <a href="/shop" style={{ color: "#fff", textDecoration: "none" }}>Shop</a>
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: "transparent", border: "none", padding: "5px 0" }}>
                <a href="/faq" style={{ color: "#fff", textDecoration: "none" }}>FAQ</a>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Social Media */}
          <Col md={4} className="mb-4">
            <h5>Follow Us</h5>
            <div>
              <Button
                variant="link"
                href="https://facebook.com"
                style={{ color: "#fff", margin: "0 10px" }}
              >
                <FaFacebook size={24} />
              </Button>
              <Button
                variant="link"
                href="https://instagram.com"
                style={{ color: "#fff", margin: "0 10px" }}
              >
                <FaInstagram size={24} />
              </Button>
              <Button
                variant="link"
                href="https://twitter.com"
                style={{ color: "#fff", margin: "0 10px" }}
              >
                <FaTwitter size={24} />
              </Button>
              <Button
                variant="link"
                href="https://youtube.com"
                style={{ color: "#fff", margin: "0 10px" }}
              >
                <FaYoutube size={24} />
              </Button>
            </div>
          </Col>
        </Row>
        <hr style={{ backgroundColor: "#fff" }} />
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
    </div>

  );
};

export default Footer;
