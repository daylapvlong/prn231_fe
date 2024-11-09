import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Button, Alert, Spinner } from "react-bootstrap";

const UserManagement = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("courseId");

  useEffect(() => {
    fetchUser();
  }, [courseId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5038/api/CoursesAttempt/GetUserAttemptByCourseId/${courseId}`
      );
      setUser(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (newStatus) => {
    try {
      setUpdating(true);
      console.log(newStatus);
      await axios.put(
        `http://localhost:5038/api/CoursesAttempt/UpdateUserAttemptStatus/${courseId}/${user.userId}`,
        {
          status: newStatus,
        }
      );
      await fetchUser(); // Refetch user data after update
    } catch (err) {
      setError("Failed to update user status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!user) {
    return <Alert variant="info">No user found for this course.</Alert>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">User Management</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Display Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.userId}</td>
            <td>{user.user.email.trim()}</td>
            <td>{user.user.displayName.trim()}</td>
            <td>{user.user.role === 1 ? "Teacher" : "Student"}</td>
            <td>{user.status === 1 ? "Available" : "Banned"}</td>
            <td>
              <Button
                variant={user.status === 1 ? "danger" : "success"}
                onClick={() => updateUserStatus(user.status === 1 ? 0 : 1)}
                disabled={updating}
              >
                {updating
                  ? "Updating..."
                  : user.status === 1
                  ? "Ban User"
                  : "Unban User"}
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      {updating && <Alert variant="info">Updating user status...</Alert>}
    </div>
  );
};

export default UserManagement;
