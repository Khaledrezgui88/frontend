import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Modal,
  Table,
  Alert,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import useUsers from "../../../hooks/useUsers.js";
import {
  EditIcon,
  DeleteIcon,
  CreateIcon,
} from "../../../assets/icons/Icons.jsx"; // Reuse the icons
import Loader from "../../../components/loader/Loader.jsx";
import { truncateText } from "../../../assets/utils/helpers.js";
import Pagination from "../../../components/paggination/Paggination.jsx"; // Pagination component
import usePagination from "../../../hooks/usePagination.js";

const UsersPage = () => {
  // Using the custom hook to manage user data and operations (CRUD)
  const {
    users,
    userSelected,
    setUserSelected,
    isLoading,
    error,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
  } = useUsers();

  // Using the pagination hook to manage the current page and items
  const { currentPage, currentItems, totalPages, handlePageChange } =
    usePagination(users, 1);

  // State to manage the modal visibility and form action (create or update)
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("create");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "Other",
  });

  // Function to show the modal and set the action (create or update)
  const handleShow = (action, user = null) => {
    setModalAction(action);
    if (action === "update" && user) {
      setUserData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "",
        gender: user.gender || "Other",
      });
      setUserSelected(user);
    } else {
      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "Other",
      });
    }
    setShowModal(true);
  };

  // Function to close the modal and reset form data
  const handleClose = () => {
    setShowModal(false);
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "Other",
    });
    setUserSelected(null);
  };

  // Function to submit the create or update user form

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (modalAction === "create") {
      createUser(userData)
        .then(() => {
          handleClose();
          getAllUsers();
        })
        .catch(() => {
          alert("Error creating user");
        });
    } else if (modalAction === "update" && userSelected) {
      updateUser(userSelected._id, userData)
        .then(() => {
          handleClose();
          getAllUsers();
        })
        .catch(() => {
          alert("Error updating user");
        });
    }
  };

  // Function to handle user deletion with confirmation
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id)
        .then(() => {
          getAllUsers(); // Refresh the list after deletion
        })
        .catch((err) => {
          alert("Error deleting user");
        });
    }
  };

  return (
    <div className="container mt-4">
      {/* Display an error message if there is an error */}
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex justify-content-between">
        <h1>Users Pages</h1>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="create-tooltip"> Create a new User </Tooltip>} // Show "Create a new User" on hover
        >
          <Button
            variant="primary"
            onClick={() => handleShow("create")}
            disabled={isLoading}
          >
            <CreateIcon />
          </Button>
        </OverlayTrigger>
      </div>

      {/* Display a loading spinner while data is being fetched */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Table to display the list of users */}
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.length > 0 ? (
                currentItems.map((user) => (
                  <tr key={user._id}>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="nameUser-tooltip">
                          {user.firstName}
                        </Tooltip>
                      } // Show full name on hover
                    >
                      <td>{truncateText(user.firstName, 6)}</td>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="emailUser-tooltip">{user.email}</Tooltip>
                      } // Show full email on hover
                    >
                      <td>{truncateText(user.email, 5)}</td>
                    </OverlayTrigger>

                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="edit-tooltip">Update</Tooltip>} // Show "Update" on hover
                      >
                        <Button
                          variant="warning"
                          onClick={() => handleShow("update", user)}
                          className="me-2"
                        >
                          <EditIcon />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="delete-tooltip"> Delete </Tooltip>
                        } // Show "Delete" on hover
                      >
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No Data Found</td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Display pagination if there are items */}
          {!error && currentItems.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {/* Modal to create or update a user */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAction === "create" ? "Create User" : "Update User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            {/* First Name */}
            <Form.Group controlId="formUserFirstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={userData.firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
                required
              />
            </Form.Group>

            {/* Last Name */}
            <Form.Group controlId="formUserLastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="formUserEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                required
              />
            </Form.Group>

            {/* Password */}
            {modalAction === "create" && (
              <Form.Group controlId="formUserPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  required
                />
              </Form.Group>
            )}

            {/* Gender */}
            <Form.Group controlId="formUserGender" className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={userData.gender}
                onChange={(e) =>
                  setUserData({ ...userData, gender: e.target.value })
                }
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              {modalAction === "create" ? "Create" : "Update"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UsersPage;

