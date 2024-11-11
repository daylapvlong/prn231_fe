import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Alert,
  Spinner,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Search } from "lucide-react";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    description: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categories, searchTerm]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5038/api/Category/GetAllCategory"
      );
      setCategories(response.data);
      setFilteredCategories(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCategory({ ...selectedCategory, [name]: value });
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      setCreating(true);
      await axios.post(
        "http://localhost:5038/api/Category/CreateCategory",
        newCategory
      );
      setNewCategory({ categoryName: "", description: "" });
      await fetchCategories();
      setError(null);
      setShowCreateModal(false);
    } catch (err) {
      setError("Failed to create category. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      await axios.post(
        `http://localhost:5038/api/Category/EditCategory?id=${selectedCategory.id}`,
        {
          categoryName: selectedCategory.categoryName,
          description: selectedCategory.description,
        }
      );
      await fetchCategories();
      setError(null);
      setShowUpdateModal(false);
    } catch (err) {
      setError("Failed to update category. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveCategory = async (id) => {
    try {
      setRemoving(true);
      await axios.delete(
        `http://localhost:5038/api/Category/RemoveCategory?id=${id}`
      );
      await fetchCategories();
      setError(null);
    } catch (err) {
      setError("Failed to remove category. Please try again.");
    } finally {
      setRemoving(false);
    }
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setNewCategory({ categoryName: "", description: "" });
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedCategory(null);
  };

  const handleOpenUpdateModal = (category) => {
    setSelectedCategory(category);
    setShowUpdateModal(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Category Management</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex justify-content-between align-items-center my-3">
        <InputGroup className="w-auto">
          <InputGroup.Text>
            <Search size={20} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search categories..."
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
        <div className="d-flex gap-2">
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            Create New Category
          </Button>
        </div>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.categoryName}</td>
              <td>{category.description}</td>
              <td>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => handleOpenUpdateModal(category)}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveCategory(category.id)}
                  disabled={removing}
                >
                  {removing ? "Removing..." : "Remove"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateCategory}>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="categoryName"
                value={newCategory.categoryName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={newCategory.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button type="submit" disabled={creating}>
              {creating ? "Creating..." : "Create Category"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateCategory}>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="categoryName"
                value={selectedCategory?.categoryName || ""}
                onChange={handleUpdateInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={selectedCategory?.description || ""}
                onChange={handleUpdateInputChange}
              />
            </Form.Group>
            <Button type="submit" disabled={updating}>
              {updating ? "Updating..." : "Update Category"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CategoryManagement;
