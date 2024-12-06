import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Modal,
  Table,
  Alert,
  OverlayTrigger,
  Tooltip,
  select,
} from "react-bootstrap";
import useProducts from "../../../hooks/useProducts.js";
import useCategorys from "../../../hooks/useCategorys.js";
import {
  EditIcon,
  DeleteIcon,
  CreateIcon,
} from "../../../assets/icons/Icons.jsx";
import Loader from "../../../components/loader/Loader.jsx";
import Pagination from "../../../components/paggination/Paggination.jsx";
import usePagination from "../../../hooks/usePagination.js";
import { truncateText } from "../../../assets/utils/helpers.js";

const Products = () => {
  const {
    products,
    productSelected,
    setProductSelected,
    isLoading,
    error,
    setError,
    deleteProduct,
    createProduct,
    updateProduct,
    getAllProducts,
  } = useProducts();

  const { categories } = useCategorys(); // Assuming categories are fetched here
  const { currentPage, currentItems, totalPages, handlePageChange } =
    usePagination(products, 1);

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("create");
  const [productData, setProductData] = useState({
    name: "",
    id: "",
    description: "",
    image: "",
    price: 0,
    store: 0,
    category: { id: "" }, // We will now use categoryId as an ID in the select
  });

  const handleShow = (action, product) => {
    setModalAction(action);
    if (action === "update" && product) {
      setProductData({
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        store: product.store,
        category: {
          id: product.category.id,
          name: product.category.name,
        },
      });
      setProductSelected(product);
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setProductData({
      name: "",
      description: "",
      image: "",
      price: 0,
      store: 0,
      category: { id: "", name: "" },
    });
    setProductSelected(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (modalAction === "create") {
      createProduct(productData)
        .then(() => {
          handleClose();
          getAllProducts();
        })
        .catch(() => alert("Error creating product"));
    } else if (modalAction === "update" && productSelected) {
      updateProduct(productSelected._id, productData)
        .then(() => {
          handleClose();
          getAllProducts();
        })
        .catch(() => alert("Error updating product"));
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
        .then(() => getAllProducts())
        .catch(() => alert("Error deleting product"));
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
        <h1>Products Page</h1>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="create-tooltip">Create a new Product</Tooltip>}
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

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Store</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.length > 0 ? (
                currentItems.map((product) => (
                  <tr key={product._id}>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="nameProduct-tooltip">
                          {product.name}
                        </Tooltip>
                      } // Display Full Name when hovered
                    >
                      <td>{truncateText(product.name, 5)}</td>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="descriptionProduct-tooltip">
                          {product.description}
                        </Tooltip>
                      } // Display Full Name when hovered
                    >
                      <td>{truncateText(product.description, 5)}</td>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="storeProduct-tooltip">
                          {product.store}
                        </Tooltip>
                      } // Display Full Name when hovered
                    >
                      <td>{product.store}</td>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="storeProduct-tooltip">
                          {product.store}
                        </Tooltip>
                      } // Display Full Name when hovered
                    >
                      <td>${product.price.toFixed(2)}</td>
                    </OverlayTrigger>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="edit-tooltip">Update</Tooltip>} // Display "Update" when hovered
                      >
                        <Button
                          variant="warning"
                          onClick={() => handleShow("update", product)}
                          className="me-2"
                        >
                          <EditIcon />
                        </Button>
                      </OverlayTrigger>

                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="delete-tooltip"> Delete </Tooltip>
                        } // Display "Delete" when hovered
                      >
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No products found.</td>
                </tr>
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
          <Modal.Title>
            {modalAction === "create" ? "Create Product" : "Update Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={productData.name}
                onChange={(e) =>
                  setProductData({ ...productData, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product description"
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductStore" className="mt-3">
              <Form.Label>Store</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter store quantity"
                value={productData.store}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    store: parseInt(e.target.value),
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice" className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={productData.price}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    price: parseFloat(e.target.value),
                  })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formProductCategory" className="mt-3">
              <Form.Label>Category</Form.Label>

              <Form.Control
                as="select"
                value={productData.category.id}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    category: { ...productData.category, id: e.target.value },
                  })
                }
              >
                <option value="">Select a category</option>
                {categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
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

export default Products;
