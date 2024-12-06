import React, { useState } from 'react';
import { Button, Form, Modal, Table, Alert, OverlayTrigger, Tooltip, ButtonGroup } from 'react-bootstrap';
import useExamples from '../../../hooks/useExample.js';
import { EditIcon, DeleteIcon, CreateIcon } from '../../../assets/icons/Icons.jsx';  // Import reusable icons
import Loader from '../../../components/loader/Loader.jsx';
import { truncateText } from '../../../assets/utils/helpers.js';
import Pagination from '../../../components/paggination/Paggination.jsx';
import usePagination from '../../../hooks/usePagination.js';

const ExamplesPage = () => {

    // TODO! Destructure custom hook to manage examples data and operations (CRUD)
    const {
        examples,
        exampleSelected,
        setExampleSelected,
        isLoading,
        error,
        setError,
        getAllExamples,
        createExample,
        updateExample,
        deleteExample
    } = useExamples()

    // TODO! Destructure pagination hook to manage current page and items
    const { currentPage, currentItems, totalPages, handlePageChange } =
        usePagination(examples,1);

    // TODO! State for handling modal visibility and form action
    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState('create');
    const [exampleData, setExampleData] = useState({ id: '', name: '', description: '' });


    // TODO! Function to show the modal and set the action (create or update)
    const handleShow = (action, example) => {
        setModalAction(action);
        if (action === 'update' && example) {
            setExampleData({ id: example._id, name: example.name, description: example.description });
            setExampleSelected(example);
        }
        setShowModal(true);
    };

    // TODO! Function to close the modal and reset form data
    const handleClose = () => {
        setShowModal(false);
        setExampleData({ id: '', name: '', description: '' });
        setExampleSelected(null);
        setError(null)
    };

    // TODO! Function to handle form submission for creating or updating an example
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (modalAction === 'create') {
            createExample(exampleData).then(() => {
                handleClose();
                getAllExamples(); // Refresh list after creation
            }).catch((err) => {
                alert("Error creating example");
            });
        } else if (modalAction === 'update' && exampleSelected) {
            updateExample(exampleSelected._id, exampleData).then(() => {
                handleClose();
                getAllExamples(); // Refresh list after update
            }).catch((err) => {
                alert("Error updating example");
            });
        }
    };

    // TODO! Function to handle deletion of an example with confirmation
    const handleDeleteExample = (id) => {
        if (window.confirm('Are you sure you want to delete this example?')) {
            deleteExample(id).then(() => {
                getAllExamples(); // Refresh list after deletion
            }).catch((err) => {
                alert("Error deleting example");
            });
        }
    };

    return (
        <div className="container mt-4">
            {/*  Display an error message if there's an error */}
            {error && <Alert variant="danger">{error}</Alert>}

            <div className='d-flex justify-content-between'>
                <h1>Examples Page</h1>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="create-tooltip">  Create a new Example </Tooltip>}  // Display "Create a new Example" when hovered
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

            {/* Show a loading spinner while data is being fetched */}
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {/* Table to display the list of examples */}
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems?.length > 0 ? (
                                currentItems.map((example) => (
                                    <tr key={example._id}>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip id="nameExample-tooltip">{example.name}</Tooltip>}  // Display Full Name when hovered
                                        >
                                            <td>{truncateText(example.name, 5)}</td>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip id="nameExample-tooltip">{example.description}</Tooltip>}  // Display Full Description when hovered
                                        >
                                            <td>{truncateText(example.description, 5)}</td>
                                        </OverlayTrigger>

                                        <td>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="edit-tooltip">Update</Tooltip>}  // Display "Update" when hovered
                                            >
                                                <Button
                                                    variant="warning"
                                                    onClick={() => handleShow('update', example)}
                                                    className="me-2"
                                                >
                                                    <EditIcon />
                                                </Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="delete-tooltip"> Delete </Tooltip>}  // Display "Delete" when hovered
                                            >
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleDeleteExample(example._id)}
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
                          {!error && currentItems?.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}


            {/* Modal for creating or updating examples */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalAction === 'create' ? 'Create Example' : 'Update Example'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formExampleName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={exampleData.name}
                                onChange={(e) => setExampleData({ ...exampleData, name: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formExampleDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                value={exampleData.description}
                                onChange={(e) => setExampleData({ ...exampleData, description: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <ButtonGroup className="my-2 d-flex justify-content-end">
                        <Button variant="primary" type="submit" className='me-2'>
                            {modalAction === 'create' ? 'Create' : 'Update'}
                        </Button>
                        <Button variant="danger" onClick={() => { handleClose() }}>
                            cancel
                        </Button>
                        </ButtonGroup>
                    </Form>
                </Modal.Body>
            </Modal>
                </>
            )}

        </div>
    );
};

export default ExamplesPage;
