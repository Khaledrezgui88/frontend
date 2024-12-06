import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Table, Alert, OverlayTrigger, Tooltip, ButtonGroup } from 'react-bootstrap';
import useCategory from '../../../hooks/useCategorys.js';
import { EditIcon, DeleteIcon, CreateIcon } from '../../../assets/icons/Icons.jsx';
import Loader from '../../../components/loader/Loader.jsx';
import Pagination from '../../../components/paggination/Paggination.jsx';
import usePagination from '../../../hooks/usePagination.js';

const CategoryPage = () => {
    const {
        categories,
        categorySelected,
        setCategorySelected,
        isLoading,
        error,
        setError,
        getAllCategorys,
        createCategory,
        updateCategory,
        deleteCategory
    } = useCategory();

    const { currentPage, currentItems, totalPages, handlePageChange } =
        usePagination(categories, 1);

    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState('create');
    const [categoryData, setCategoryData] = useState({ id: '', name: '' });

    const handleShow = (action, category) => {
        setModalAction(action);
        if (action === 'update' && category) {
            setCategoryData({ id: category._id, name: category.name });
            setCategorySelected(category);
        }
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setCategoryData({ id: '', name: '' });
        setCategorySelected(null);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (modalAction === 'create') {
            createCategory(categoryData)
                .then(() => {
                    handleClose();
                    getAllCategorys();
                })
                .catch((err) => {
                    alert("Error creating category");
                });
        } else if (modalAction === 'update' && categorySelected) {
            updateCategory(categorySelected._id, categoryData)
                .then(() => {
                    handleClose();
                    getAllCategorys();
                })
                .catch((err) => {
                    alert("Error updating category");
                });
        }
    };

    const handleDeleteCategory = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            deleteCategory(id)
                .then(() => {
                    getAllCategorys();
                })
                .catch((err) => {
                    alert("Error deleting category");
                });
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className="container mt-4">
            {error && <Alert variant="danger">{error}</Alert>}

            <div className='d-flex justify-content-between'>
                <h1>Categories</h1>
                <Button
                    variant="primary"
                    onClick={() => handleShow('create')}
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
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems?.length > 0 ? (
                                currentItems.map((category) => (
                                    <tr key={category._id}>
                                        <td>{category.name}</td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                onClick={() => handleShow('update', category)}
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
                                <tr><td colSpan="2">No categories found</td></tr>
                            )}
                        </tbody>
                    </Table>

                    {currentItems?.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalAction === 'create' ? 'Create Category' : 'Update Category'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formCategoryName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category name"
                                value={categoryData.name}
                                onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <ButtonGroup className="mt-3 d-flex justify-content-end">
                            <Button variant="primary" type="submit" className="me-2">
                                {modalAction === 'create' ? 'Create' : 'Update'}
                            </Button>
                            <Button variant="danger" onClick={handleClose}>
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CategoryPage;