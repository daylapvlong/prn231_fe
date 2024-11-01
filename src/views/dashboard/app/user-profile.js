import React, { useState, useEffect } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import { useLocation } from "react-router-dom";

// img
import avatars1 from "../../../assets/images/avatars/01.png";

const UserProfile = () => {
  const [notification, setNotification] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5038/api/user/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setFormData({
          ...userData,
          password: "",
          confirmPassword: "",
        });
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setNotification({
        type: "error",
        message: "Failed to load user data. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.displayName.trim()) {
      newErrors.displayName = "Display name is required";
    }

    if (isEditing && formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long";
      }

      if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      setNotification({
        type: "error",
        message: "Please correct the errors in the form.",
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5038/api/user/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            displayName: formData.displayName,
            password: formData.password,
            role: formData.role,
          }),
        }
      );

      if (response.ok) {
        setNotification({
          type: "success",
          message: "User profile updated successfully!",
        });
        setIsEditing(false);
      } else {
        throw new Error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setNotification({
        type: "error",
        message: "Failed to update user profile. Please try again.",
      });
    }
  };

  const toggleEditing = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
    if (!isEditing) {
      setErrors({});
    }
  };

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <div>
        <Row>
          <Col xl="3" lg="4">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Your personal information</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <div className="profile-img-edit position-relative">
                    <Image
                      className="theme-color-default-img profile-pic rounded avatar-100"
                      src={avatars1}
                      alt="profile-pic"
                    />
                  </div>
                  <Form.Group className="form-group">
                    <Form.Label>User Role:</Form.Label>
                    <Form.Control
                      as="select"
                      id="role"
                      value={formData.role}
                      disabled={true}
                    >
                      <option value="">Select</option>
                      <option value="0">Admin</option>
                      <option value="1">Teacher</option>
                      <option value="2">Student</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="col-md-12 form-group">
                    <Form.Label htmlFor="displayName">Display Name:</Form.Label>
                    <Form.Control
                      type="text"
                      id="displayName"
                      placeholder="Display Name"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      isInvalid={!!errors.displayName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.displayName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="col-md-12 form-group">
                    <Form.Label htmlFor="username">User Name:</Form.Label>
                    <Form.Control
                      type="text"
                      id="username"
                      placeholder="User Name"
                      value={formData.username}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="col-md-12 form-group">
                    <Form.Label htmlFor="email">Email:</Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {isEditing && (
                    <>
                      <Form.Group className="col-md-12 form-group">
                        <Form.Label htmlFor="password">Password:</Form.Label>
                        <Form.Control
                          type="password"
                          id="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleInputChange}
                          isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="col-md-12 form-group">
                        <Form.Label htmlFor="confirmPassword">
                          Repeat Password:
                        </Form.Label>
                        <Form.Control
                          type="password"
                          id="confirmPassword"
                          placeholder="Repeat Password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          isInvalid={!!errors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </>
                  )}

                  {notification && (
                    <div
                      className={`mb-4 p-4 rounded-md ${
                        notification.type === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {notification.message}
                    </div>
                  )}

                  {isEditing ? (
                    <Button type="submit" variant="btn btn-primary">
                      Update User
                    </Button>
                  ) : (
                    <div onClick={toggleEditing} className="btn btn-secondary">
                      Edit Profile
                    </div>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col xl="9" lg="8">
            <Card>
              <Card.Body></Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserProfile;
