import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import useCategorys from "../../hooks/useCategory.js";
import { EditIcon, DeleteIcon, CreateIcon } from "../../assets/icons/Icons.jsx";
import Loader from "../../components/loader/Loader.jsx";
import Pagination from "../../components/paggination/Paggination.jsx";
import usePagination from "../../hooks/usePagination.js";

const Category = () => {
  const { categories, isLoading, error, deleteCategory, createCategory, updateCategory, getAllCategories } = useCategorys();

  const { currentPage, currentItems, totalPages, handlePageChange } = usePagination(categories, 1);

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("create");
  const [categoryData, setCategoryData] = useState({
    name: "",
  });

  const handleShow = (action, category) => {
    setModalAction(action);
    if (action === "update" && category) {
      setCategoryData({
        name: category.name,
      });
    } else {
      setCategoryData({ name: "" });
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCategoryData({ name: "" });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (modalAction === "create") {
      try {
        await createCategory(categoryData);
        handleClose();
        getAllCategories();
      } catch (error) {
        alert("Error creating category");
      }
    } else if (modalAction === "update") {
      try {
        await updateCategory(categoryData._id, categoryData);
        handleClose();
        getAllCategories();
      } catch (error) {
        alert("Error updating category");
      }
    }
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory(id)
        .then(() => getAllCategories())
        .catch(() => alert("Error deleting category"));
    }
  };

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex justify-content-between">
        <h1>Categories</h1>
        <Button variant="primary" onClick={() => handleShow("create")} disabled={isLoading}>
          <CreateIcon />
        </Button>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.length > 0 ? (
                currentItems.map((category) => (
                  <tr key={category._id}>
                    <td>{category._id}</td>
                    <td>{category.name}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleShow("update", category)}
                        className="me-2"
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteCategory(category._id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No categories found</td>
                </tr>
              )}
            </tbody>
          </Table>

          {currentItems?.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </>
      )}

      {/* Modal for creating/updating category */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalAction === "create" ? "Create Category" : "Update Category"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={categoryData.name}
                onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {modalAction === "create" ? "Create" : "Update"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Category;
