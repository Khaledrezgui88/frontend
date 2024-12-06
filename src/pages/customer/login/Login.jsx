import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/auth/auth.slice.js";

const LoginPage = () => {

  const token = localStorage.getItem('token');

  const [error, setError] = useState(""); // Error message
  const [data, setData] = useState({ email: "", password: "" }); // Form data

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Update form values
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const resultAction = await dispatch(loginUser(data)).unwrap();
      localStorage.setItem("token", resultAction.token);
      navigate(resultAction.payload.isAdmin ? "/admin-dashboard" : "/products");
    } catch {
      setError("Login failed. Please check your credentials.");
    }
  };
 if (token) return <Navigate to="/products" />;

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}
>
      <Row className="w-100">
        <Col md={6} lg={5} className="mx-auto">
          <Card className="shadow-lg" style={{ borderRadius: "15px", overflow: "hidden" }}>
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/500x200?text=Welcome+Back!"
              alt="Login Banner"
              style={{ objectFit: "cover", height: "200px" }}
            />
            <Card.Body>
              <h2 className="text-center mb-4" style={{ color: "#ff758c", fontWeight: "bold" }}>
                Welcome Back
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                {/* Email Field */}
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label className="text-start w-100">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {/* Password Field */}
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label className="text-start w-100">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {/* Submit Button */}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  style={{
                    backgroundColor: "#ff758c",
                    borderColor: "#ff758c",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Button>
              </Form>
              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link to="/signup" style={{ color: "#ff758c", fontWeight: "bold" }}>
                  Sign up
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
