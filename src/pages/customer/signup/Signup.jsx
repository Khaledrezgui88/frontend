import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/auth/auth.slice.js";

const SignupPage = () => {
  const token = localStorage.getItem('token');

  const [error, setError] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lasttName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const resultAction = await dispatch(registerUser(data)).unwrap();
      if (resultAction) {
        navigate("/products");
      }
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  if (token) return <Navigate to="/products" />;

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center"
      style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}
    >
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto">
          <Card className="shadow-lg" style={{ borderRadius: "15px", overflow: "hidden" }}>
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/600x200?text=Join+Our+Community"
              alt="Signup Banner"
              style={{ objectFit: "cover", height: "200px" }}
            />
            <Card.Body>
              <h2 className="text-center mb-4" style={{ color: "#ff758c", fontWeight: "bold" }}>
                Create Your Account
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                {/* First Name Field */}
                <Form.Group controlId="formFirstName" className="mb-3">
                  <Form.Label className="text-start w-100">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    name="firstName"
                    value={data.firstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Last Name Field */}
                <Form.Group controlId="formLastName" className="mb-3">
                  <Form.Label className="text-start w-100">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    name="lasttName"
                    value={data.lasttName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Email Address Field */}
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label className="text-start w-100">Email Address</Form.Label>
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
                    placeholder="Create a password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Confirm Password Field */}
                <Form.Group controlId="formConfirmPassword" className="mb-3">
                  <Form.Label className="text-start w-100">Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Gender Selection */}
                <Form.Group controlId="formGender" className="mb-3">
                  <Form.Label className="text-start w-100">Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={data.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>

                {/* Submit Button */}
                <Button
                  variant="success"
                  type="submit"
                  className="w-100"
                  style={{
                    backgroundColor: "#ff758c",
                    borderColor: "#ff758c",
                    fontWeight: "bold",
                  }}
                >
                  Sign Up
                </Button>
              </Form>
              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/login"  style={{ color: "#ff758c", fontWeight: "bold" }}>
                  Login
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
