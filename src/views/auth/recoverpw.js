import React, { useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/Card";

// img
import auth2 from "../../assets/images/auth/02.png";

const Recoverpw = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // State to track email input
  const [error, setError] = useState(null); // State to handle errors
  const [success, setSuccess] = useState(null); // State to handle success
  const [isSuccess, setIsSuccess] = useState(false); // State to track success state

  // Function to call the forgot password API
  async function forgotPassword(email) {
    try {
      const response = await fetch(
        "http://localhost:5038/api/ForgotPassword/ForgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const responseText = await response.text(); // Await the response text

      if (!response.ok) {
        setError(responseText); // Set error message to the response text
        setIsSuccess(false); // Reset success state on error
        return; // Exit the function early if there was an error
      }

      setSuccess(responseText); // Set success message to the response text
      setIsSuccess(true); // Set success state to true
      setError(null); // Clear any previous error message
    } catch (error) {
      console.error(
        "There was an error with the forgot password request:",
        error
      );
      setError("Failed to reset password. Please try again."); // Set generic error message
      setIsSuccess(false); // Reset success state on error
    }
  }

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from submitting the default way
    await forgotPassword(email); // Call forgotPassword with the email state
  };

  return (
    <>
      <section className="login-content">
        <Row className="m-0 align-items-center bg-white vh-100">
          <Col
            md="6"
            className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden"
          >
            <Image
              src={auth2}
              className="img-fluid gradient-main animated-scaleX"
              alt="images"
            />
          </Col>
          <Col md="6" className="p-0">
            <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
              <Card.Body>
                <Link
                  to="/dashboard"
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

                {/* Conditionally render the form or success message */}
                {!isSuccess ? (
                  <div>
                    <h2 className="mb-2">Reset Password</h2>
                    <p>
                      Enter your email address and we'll send you an email with
                      instructions to reset your password.
                    </p>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col lg="12" className="col-lg-12">
                          <Form.Group className="floating-label">
                            <Form.Label htmlFor="email" className="form-label">
                              Email
                            </Form.Label>
                            <Form.Control
                              type="email"
                              className="form-control"
                              id="email"
                              aria-describedby="email"
                              placeholder=" "
                              value={email} // Bind input value to state
                              onChange={(e) => setEmail(e.target.value)} // Update state on change
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      {error && <p className="text-danger">{error}</p>}{" "}
                      {/* Show error message if any */}
                      <Button className="mt-3" type="submit" variant="primary">
                        Reset
                      </Button>
                    </Form>
                  </div>
                ) : (
                  // Success message
                  <>
                    <h2 className="mt-3 mb-0">Success!</h2>
                    <p className="cnf-mail mb-1">
                      An email has been sent to {email}. Please check for an
                      email and click on the included link to reset your
                      password.
                    </p>
                    <div className="d-inline-block w-100">
                      <Link to="/home" className="btn btn-primary mt-3">
                        Back to Home
                      </Link>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
            <div className="sign-bg sign-bg-right">
              <svg
                width="280"
                height="230"
                viewBox="0 0 431 398"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.05">
                  <rect
                    x="-157.085"
                    y="193.773"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(-45 -157.085 193.773)"
                    fill="#3B8AFF"
                  />
                  <rect
                    x="7.46875"
                    y="358.327"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(-45 7.46875 358.327)"
                    fill="#3B8AFF"
                  />
                  <rect
                    x="61.9355"
                    y="138.545"
                    width="310.286"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(45 61.9355 138.545)"
                    fill="#3B8AFF"
                  />
                  <rect
                    x="62.3154"
                    y="-190.173"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(45 62.3154 -190.173)"
                    fill="#3B8AFF"
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

export default Recoverpw;
