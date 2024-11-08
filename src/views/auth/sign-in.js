import React, { useState, useEffect } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import auth1 from "../../assets/images/auth/01.png";
import { GoogleOAuthProvider } from "@react-oauth/google";

function GoogleLoginButton() {
  // const { HandleIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Callback function that gets triggered when Google Login is successful
  const handleCallbackResponse = (response) => {
    const googleIdToken = response.credential; // This is the ID Token (JWT)

    // Send the token to your backend for verification/authentication
    axios
      .post("http://localhost:5038/api/LoginGoogle/GoogleSignIn", {
        googleIdToken, // Send the token to your backend
      })
      .then(async (response) => {
        const { token, user } = response.data;
        const userData = {
          displayName: user.displayName,
          email: user.email,
          id: user.id,
          role: user.role.toString(),
          username: user.username,
        };

        // Save token and user to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        // HandleIsAuthenticated();
        await fetchUserData(response.data.token, setError);
        navigate("/home"); // Redirect using useNavigate
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  const fetchUserData = async (token, setError) => {
    try {
      // Make a GET request to fetch user data using the stored token
      const response = await fetch("http://localhost:5038/api/Login/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();

        // Save user data in localStorage and update state
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      setError("Error fetching user data");
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // Load the Google Sign-In script dynamically
    /* global google */
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Initialize Google Sign-In after the script is loaded
      if (window.google) {
        google.accounts.id.initialize({
          client_id:
            "484867254185-k0m64ts4471rv8skph7qrucma0t3e84a.apps.googleusercontent.com",
          callback: handleCallbackResponse,
        });

        // Render the Google Sign-In button in the div with the ID "signInDiv"
        google.accounts.id.renderButton(document.getElementById("signInDiv"), {
          theme: "outline",
          size: "large",
        });
      }
    };
    document.head.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      {/* This is the div where the Google button will be rendered */}
      <div id="signInDiv"></div>
    </div>
  );
}

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate instead of history
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to authenticate the user
      const response = await axios.post("http://localhost:5038/api/Login", {
        username,
        password,
      });

      // Save the JWT in localStorage
      localStorage.setItem("token", response.data.token);

      // Set token expiration (3 hours from now)
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 3);
      localStorage.setItem("tokenExpiration", expirationTime);

      // Fetch user data after successful login
      await fetchUserData(response.data.token, setError);

      // Redirect to home or dashboard after successful login
      navigate("/home"); // Redirect using useNavigate
    } catch (err) {
      setError("Invalid credentials");
      console.error("Login error:", err);
    }
  };

  const fetchUserData = async (token, setError) => {
    try {
      // Make a GET request to fetch user data using the stored token
      const response = await fetch("http://localhost:5038/api/Login/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();

        // Save user data in localStorage and update state
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      setError("Error fetching user data");
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <>
      <GoogleOAuthProvider clientId="484867254185-k0m64ts4471rv8skph7qrucma0t3e84a.apps.googleusercontent.com">
        <section className="login-content">
          <Row className="m-0 align-items-center bg-white vh-100">
            <Col md="6">
              <Row className="justify-content-center">
                <Col md="10">
                  <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
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
                        <h4 className="logo-title ms-3">QuizMaster</h4>
                      </Link>
                      <h2 className="mb-2 text-center">Sign In</h2>
                      <p className="text-center">Login to stay connected.</p>
                      {error && (
                        <p style={{ color: "red" }} className="text-center">
                          {error}
                        </p>
                      )}{" "}
                      {/* Display error message */}
                      <Form onSubmit={handleLogin}>
                        {" "}
                        {/* Bind the form submission to handleLogin */}
                        <Row>
                          <Col lg="12">
                            <Form.Group className="form-group">
                              <Form.Label htmlFor="username" className="">
                                Username
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder=" "
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col lg="12" className="">
                            <Form.Group className="form-group">
                              <Form.Label htmlFor="password" className="">
                                Password
                              </Form.Label>
                              <div className="input-group">
                                <Form.Control
                                  type={showPassword ? "text" : "password"}
                                  id="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  placeholder=" "
                                  required
                                />
                                <div className="input-group-append">
                                  <span
                                    className="input-group-text"
                                    onClick={togglePasswordVisibility}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {showPassword ? (
                                      <EyeOff size={20} />
                                    ) : (
                                      <Eye size={20} />
                                    )}
                                  </span>
                                </div>
                              </div>
                            </Form.Group>
                          </Col>
                          <Col
                            lg="12"
                            className="d-flex justify-content-between"
                          >
                            <Form.Check className="form-check mb-3">
                              <Form.Check.Input
                                type="checkbox"
                                id="customCheck1"
                              />
                              <Form.Check.Label htmlFor="customCheck1">
                                Remember Me
                              </Form.Check.Label>
                            </Form.Check>
                            <Link to="/auth/recoverpw">Forgot Password?</Link>
                          </Col>
                        </Row>
                        <div className="d-flex justify-content-center space-x-2">
                          <Button type="submit" variant="btn btn-primary">
                            Sign In
                          </Button>{" "}
                          <GoogleLoginButton />
                          {/* Button type changed to submit */}
                        </div>
                        <p className="mt-3 text-center">
                          Don’t have an account?{" "}
                          <Link to="/auth/sign-up" className="text-underline">
                            Click here to sign up.
                          </Link>
                        </p>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <div className="sign-bg">
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
            <Col
              md="6"
              className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden"
            >
              <Image
                src={auth1}
                className="Image-fluid gradient-main animated-scaleX"
                alt="images"
              />
            </Col>
          </Row>
        </section>
      </GoogleOAuthProvider>
    </>
  );
};

export default SignIn;
