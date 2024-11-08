import React, { useEffect, useState } from "react";
import { Row, Col, Image, Modal, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import axios from "axios";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateData, setUpdateData] = useState({ role: "", status: "" });

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get("http://localhost:5038/api/User/list");
        setUserList(response.data);
      } catch (error) {
        console.error("Error fetching user list", error);
      }
    };

    fetchUserList();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setUpdateData({
      role: user.role.toString(),
      status: user.status.toString(),
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setUpdateData({ role: "", status: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      await axios.put(
        `http://localhost:5038/api/user/updateAdmin/${selectedUser.id}`,
        {
          role: parseInt(updateData.role),
          status: parseInt(updateData.status),
        }
      );

      // Update the user in the local state
      const updatedUserList = userList.map((user) =>
        user.id === selectedUser.id ? { ...user, ...updateData } : user
      );
      setUserList(updatedUserList);

      alert("Update success");
      handleCloseModal();
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">User List</h4>
                </div>
              </Card.Header>
              <Card.Body className="px-0">
                <div className="table-responsive">
                  <table
                    id="user-list-table"
                    className="table table-striped"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="ligth">
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Join Date</th>
                        <th min-width="100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList.map((item, idx) => (
                        <tr key={idx}>
                          <td className="text-center">
                            <Image
                              className="bg-soft-primary rounded img-fluid avatar-40 me-3"
                              src={`https://via.placeholder.com/40`}
                              alt="profile"
                            />
                          </td>
                          <td>{item.displayName}</td>
                          <td>{item.username}</td>
                          <td>{item.email}</td>
                          <td>
                            <span
                              className={`badge ${
                                item.status === 1 ? "bg-primary" : "bg-warning"
                              }`}
                            >
                              {item.status === 1 ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>{new Date(item.created).toLocaleDateString()}</td>
                          <td>
                            <div className="flex align-items-center list-user-action">
                              <Link
                                className="btn btn-sm btn-icon btn-warning"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Edit"
                                onClick={() => handleEditClick(item)}
                              >
                                <span className="btn-inner">
                                  <svg
                                    width="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                    <path
                                      d="M15.1655 4.60254L19.7315 9.16854"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                  </svg>
                                </span>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={updateData.role}
                onChange={handleInputChange}
              >
                <option value="0">Admin</option>
                <option value="1">Teacher</option>
                <option value="2">Student</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={updateData.status}
                onChange={handleInputChange}
              >
                <option value="1">Available</option>
                <option value="0">Disabled</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateUser}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserList;
