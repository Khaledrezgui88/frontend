import React, { useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import useCommandes from "../../../hooks/useCommandes.js";
import Loader from "../../../components/loader/Loader";
import { EditIcon, DeleteIcon, CreateIcon } from "../../../assets/icons/Icons";
import { truncateText } from "../../../assets/utils/helpers";
import Pagination from "../../../components/paggination/Paggination";
import usePagination from "../../../hooks/usePagination";

const Commande = () => {
  const {
    commandes,
    isLoading,
    error,
    deleteCommande,
    createCommande,
    updateCommande,
    getAllCommandes,
    getUserName,
    products,
    users,
  } = useCommandes();

  // TODO! Destructure pagination hook to manage current page and items
  const { currentPage, currentItems, totalPages, handlePageChange } =
    usePagination(commandes, 1);

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("create");
  const [commandeData, setCommandeData] = useState({
    id: "",
    products: [{ productId: "", quantity: 1 }],
    userId: "",
    status: "",
  });

  const handleShow = (action, commande) => {
    setModalAction(action);
    if (action === "update" && commande) {
      setCommandeData({
        id: commande._id,
        products: commande.products || [],
        userId: commande.userId,
        status: commande.status,
      });
    } else {
      setCommandeData({
        products: [{ productId: "", quantity: 1 }],
        userId: "",
      });
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCommandeData({
      id: "",
      products: [{ productId: "", quantity: 1 }],
      userId: "",
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (modalAction === "create") {
      try {
        await createCommande(commandeData);
        handleClose();
        getAllCommandes();
      } catch (err) {
        alert("Error creating commande");
      }
    } else if (modalAction === "update") {
      try {
        await updateCommande(commandeData.id, commandeData);
        handleClose();
        getAllCommandes();
      } catch (err) {
        alert("Error updating commande");
      }
    }
  };

  const handleDeleteCommande = async (id) => {
    if (window.confirm("Are you sure you want to delete this commande?")) {
      try {
        await deleteCommande(id);
        getAllCommandes();
      } catch (err) {
        alert("Error deleting commande");
      }
    }
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...commandeData.products];
    updatedProducts[index][field] = value;
    setCommandeData({ ...commandeData, products: updatedProducts });
  };

  const addProductField = () => {
    setCommandeData({
      ...commandeData,
      products: [...commandeData.products, { productId: "", quantity: 1 }],
    });
  };

  const removeProductField = (index) => {
    const updatedProducts = commandeData.products.filter((_, i) => i !== index);
    setCommandeData({ ...commandeData, products: updatedProducts });
  };

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex justify-content-between">
        <h1>Commandes</h1>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="create-tooltip"> Create </Tooltip>} // Display "Delete" when hovered
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
                <th>Date Commande</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>User</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.length > 0 ? (
                currentItems.map((commande) => (
                  <tr key={commande._id}>
                    <td>
                      {new Date(commande.dateCommande).toLocaleDateString(
                        "fr-FR"
                      )}
                    </td>
                    <td>{commande.status}</td>
                    <td>{commande.totalPrice}</td>
                    <td>{truncateText(getUserName(commande.userId), 4)}</td>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="update-tooltip"> Update </Tooltip>
                        } // Display "Delete" when hovered
                      >
                        <Button
                          variant="warning"
                          onClick={() => handleShow("update", commande)}
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
                          onClick={() => handleDeleteCommande(commande._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No commandes found</td>
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
            {modalAction === "create" ? "Create" : "Update"} Commande
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            {commandeData.products.map((product, index) => (
              <div key={index} className="mb-3">
                <Form.Group controlId={`productId-${index}`}>
                  <Form.Label>Product</Form.Label>
                  <Form.Control
                    as="select"
                    value={product.productId}
                    onChange={(e) =>
                      handleProductChange(index, "productId", e.target.value)
                    }
                  >
                    <option value="">Select a product</option>
                    {products?.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId={`quantity-${index}`}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      handleProductChange(index, "quantity", e.target.value)
                    }
                  />
                </Form.Group>

                {commandeData.products.length > 1 && (
                  <Button
                    variant="danger"
                    onClick={() => removeProductField(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="secondary"
              onClick={addProductField}
              className="mb-3"
            >
              Add Product
            </Button>
            <Form.Group controlId="userId">
              <Form.Label>User</Form.Label>
              <Form.Control
                as="select"
                value={commandeData.userId}
                onChange={(e) =>
                  setCommandeData({ ...commandeData, userId: e.target.value })
                }
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </Form.Control>
              {modalAction === "update" && (
                <Form.Group controlId="formCommandeStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={commandeData.status}
                    onChange={(e) =>
                      setCommandeData({
                        ...commandeData,
                        status: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Control>
                </Form.Group>
              )}
            </Form.Group>
            <Button type="submit" variant="success" className="mt-3">
              {modalAction === "create" ? "Create" : "Update"} Commande
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Commande;
