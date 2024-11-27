// src/pages/comment/Comment.jsx
import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Modal,
  Table,
  Alert,
} from "react-bootstrap";
import useComments from "../../hooks/usecomment"; 
import { CreateIcon, DeleteIcon } from "../../assets/icons/Icons";
import Loader from "../../components/loader/Loader";
import Pagination from "../../components/pagination/Pagination"; // Correct path
import usePagination from "../../hooks/usePagination";

const Comment = () => {
  const {
    comments,
    commentSelected,
    setCommentSelected,
    isLoading,
    error,
    setError,
    createComment,
    deleteComment,
  } = useComments();

  const { currentPage, currentItems, totalPages, handlePageChange } =
    usePagination(comments, 1);

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("create");
  const [commentData, setCommentData] = useState({
    text: "",
    userId: "",
    productId: "",
    date: new Date().toISOString(),
  });

  const handleShow = (action, comment) => {
    setModalAction(action);
    if (action === "update" && comment) {
      setCommentData({
        text: comment.text,
        userId: comment.userId,
        productId: comment.productId,
        date: comment.date,
      });
      setCommentSelected(comment);
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCommentData({
      text: "",
      userId: "",
      productId: "",
      date: new Date().toISOString(),
    });
    setCommentSelected(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (modalAction === "create") {
      createComment(commentData)
        .then(() => {
          handleClose();
        })
        .catch(() => alert("Error creating comment"));
    }
  };

  const handleDeleteComment = (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteComment(id);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [setError, error]);

  return (
    <div className="container mt-4">
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex justify-content-between">
        <h1>Comments</h1>
        <Button
          variant="primary"
          onClick={() => handleShow("create")}
          disabled={isLoading}
        >
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
                <th>Text</th>
                <th>User ID</th>
                <th>Product ID</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((comment) => (
                  <tr key={comment.id}>
                    <td>{comment.text}</td>
                    <td>{comment.userId}</td>
                    <td>{comment.productId}</td>
                    <td>{comment.date}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No comments found.</td>
                </tr>
              )}
            </tbody>
          </Table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAction === "create" ? "Create Comment" : "Update Comment"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formCommentText">
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter comment text"
                value={commentData.text}
                onChange={(e) =>
                  setCommentData({ ...commentData, text: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formUserId" className="mt-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user ID"
                value={commentData.userId}
                onChange={(e) =>
                  setCommentData({ ...commentData, userId: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductId" className="mt-3">
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product ID"
                value={commentData.productId}
                onChange={(e) =>
                  setCommentData({ ...commentData, productId: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              {modalAction === "create" ? "Create" : "Update"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Comment;
