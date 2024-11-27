import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import useUsers from '../../hooks/useUser.js'
import { EditIcon, DeleteIcon, CreateIcon } from '../../assets/icons/Icons.jsx';  // Reuse the icons
import Loader from '../../components/loader/Loader.jsx';
import { truncateText } from '../../assets/utils/helpers.js';
import Pagination from '../../components/paggination/Paggination.jsx'; // Pagination component
import usePagination from '../../hooks/usePagination.js';

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
        deleteUser
    } = useUsers();

    // Using the pagination hook to manage the current page and items
    const { currentPage, currentItems, totalPages, handlePageChange } =
        usePagination(users, 1);

    // State to manage the modal visibility and form action (create or update)
    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState('create');
    const [userData, setUserData] = useState({ id: '', name: '', email: '' });

    // Function to show the modal and set the action (create or update)
    const handleShow = (action, user) => {
        setModalAction(action);
        if (action === 'update' && user) {
            setUserData({ id: user._id, name: user.name, email: user.email });
            setUserSelected(user);
        }
        setShowModal(true);
    };

    // Function to close the modal and reset form data
    const handleClose = () => {
        setShowModal(false);
        setUserData({ id: '', name: '', email: '' });
        setUserSelected(null);
    };

    // Function to submit the create or update user form
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (modalAction === 'create') {
            createUser(userData).then(() => {
                handleClose();
                getAllUsers(); // Refresh the list after creation
            }).catch((err) => {
                alert("Error creating user");
            });
        } else if (modalAction === 'update' && userSelected) {
            updateUser(userSelected._id, userData).then(() => {
                handleClose();
                getAllUsers(); // Refresh the list after update
            }).catch((err) => {
                alert("Error updating user");
            });
        }
    };

    // Function to handle user deletion with confirmation
    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(id).then(() => {
                getAllUsers(); // Refresh the list after deletion
            }).catch((err) => {
                alert("Error deleting user");
            });
        }
    };

    return (
        <div className="container mt-4">

            {/* Display an error message if there is an error */}
            {error && <Alert variant="danger">{error}</Alert>}

            <div className='d-flex justify-content-between'>
                <h1>Users Pages</h1>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="create-tooltip">  Create a new User </Tooltip>}  // Show "Create a new User" on hover
                >
                    <Button
                        variant="primary"
                        onClick={() => handleShow('create')}
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
                                            overlay={<Tooltip id="nameUser-tooltip">{user.name}</Tooltip>}  // Show full name on hover
                                        >
                                            <td>{truncateText(user.name, 5)}</td>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip id="emailUser-tooltip">{user.email}</Tooltip>}  // Show full email on hover
                                        >
                                            <td>{truncateText(user.email, 5)}</td>
                                        </OverlayTrigger>

                                        <td>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="edit-tooltip">Update</Tooltip>}  // Show "Update" on hover
                                            >
                                                <Button
                                                    variant="warning"
                                                    onClick={() => handleShow('update', user)}
                                                    className="me-2"
                                                >
                                                    <EditIcon />
                                                </Button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="delete-tooltip"> Delete </Tooltip>}  // Show "Delete" on hover
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
                                <tr><td colSpan="3">No Data Found</td></tr>
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
                    <Modal.Title>{modalAction === 'create' ? 'Create User' : 'Update User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formUserName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={userData.name}
                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formUserEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {modalAction === 'create' ? 'Create' : 'Update'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UsersPage;
