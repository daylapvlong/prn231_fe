import React, { useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../../components/Card";
import axios from "axios"; // Import Axios
// img
import auth5 from "../../../assets/images/auth/05.png";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setError("");
    setSuccessMessage("");

    // Validation (basic example)
    if (password !== repassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5038/api/Register", {
        username,
        email,
        displayName,
        password,
      });

      setSuccessMessage("Sign Up successful!"); // Display success message
      console.log(response.data); // Handle response as needed

      // Optionally redirect to another page after successful sign-up
      navigate("/auth/sign-in");
    } catch (err) {
      setError(err.response?.data?.message || err.message); // Display error message
    }
  };

  return (
    <>
      <section className="login-content">
        <Row className="m-0 align-items-center bg-white vh-100">
          <div className="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
            <Image
              src={auth5}
              className="Image-fluid gradient-main animated-scaleX"
              alt="images"
            />
          </div>
          <Col md="6">
            <Row className="justify-content-center">
              <Col md="10">
                <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
                  <Card.Body>
                    <Link
                      to="/home"
                      className="navbar-brand d-flex align-items-center mb-3"
                    >
                      <svg
                        width="30"
                        className="text-primary"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="-0.757324"
                          y="19.2427"
                          width="28"
                          height="4"
                          rx="2"
                          transform="rotate(-45 -0.757324 19.2427)"
                          fill="currentColor"
                        />
                        <rect
                          x="7.72803"
                          y="27.728"
                          width="28"
                          height="4"
                          rx="2"
                          transform="rotate(-45 7.72803 27.728)"
                          fill="currentColor"
                        />
                        <rect
                          x="10.5366"
                          y="16.3945"
                          width="16"
                          height="4"
                          rx="2"
                          transform="rotate(45 10.5366 16.3945)"
                          fill="currentColor"
                        />
                        <rect
                          x="10.5562"
                          y="-0.556152"
                          width="28"
                          height="4"
                          rx="2"
                          transform="rotate(45 10.5562 -0.556152)"
                          fill="currentColor"
                        />
                      </svg>
                      <h4 className="logo-title ms-3">Hope UI</h4>
                    </Link>
                    <h2 className="mb-2 text-center">Sign Up</h2>
                    <p className="text-center">Create your Hope UI account.</p>

                    {/* Display error or success messages */}
                    {error && (
                      <p className="text-danger text-center">{error}</p>
                    )}
                    {successMessage && (
                      <p className="text-success text-center">
                        {successMessage}
                      </p>
                    )}

                    <Form onSubmit={handleSignUp}>
                      <Row>
                        <Col lg="12">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="username">Username</Form.Label>
                            <Form.Control
                              type="text"
                              id="username"
                              placeholder="Enter your username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="12">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control
                              type="email"
                              id="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="12">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="displayName">
                              Display Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="displayName"
                              placeholder="Enter your display name"
                              value={displayName}
                              onChange={(e) => setDisplayName(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="12">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control
                              type="password"
                              id="password"
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="12">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="repassword">
                              Confirm Password
                            </Form.Label>
                            <Form.Control
                              type="password"
                              id="repassword"
                              placeholder="Confirm your password"
                              value={repassword}
                              onChange={(e) => setRepassword(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="12" className="d-flex justify-content-center">
                          <Form.Check className="mb-3 form-check">
                            <Form.Check.Input
                              type="checkbox"
                              id="customCheck1"
                              required
                            />
                            <Form.Check.Label htmlFor="customCheck1">
                              I agree with the terms of use
                            </Form.Check.Label>
                          </Form.Check>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-center">
                        <Button type="submit" variant="primary">
                          Sign Up
                        </Button>
                      </div>
                      <p className="mt-3 text-center">
                        Already have an Account{" "}
                        <Link to="/auth/sign-in" className="text-underline">
                          Sign In
                        </Link>
                      </p>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="sign-bg sign-bg-right">
              <svg
                width="280"
                height="230"
                viewBox="0 0 421 359"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.05">
                  <rect
                    x="-15.0845"
                    y="154.773"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(-45 -15.0845 154.773)"
                    fill="#3A57E8"
                  />
                  <rect
                    x="149.47"
                    y="319.328"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(-45 149.47 319.328)"
                    fill="#3A57E8"
                  />
                  <rect
                    x="203.936"
                    y="99.543"
                    width="310.286"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(45 203.936 99.543)"
                    fill="#3A57E8"
                  />
                  <rect
                    x="204.316"
                    y="-229.172"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(45 204.316 -229.172)"
                    fill="#3A57E8"
                  />
                </g>
              </svg>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default SignUp;
