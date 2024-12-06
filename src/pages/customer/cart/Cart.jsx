import React, { useState } from 'react';
import { Button, Image, Row, Col, Container, Alert } from 'react-bootstrap';
import useCartItem from '../../../hooks/useCartItem.js';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartItem = () => {
    const cart = useSelector((state) => state.cart);
    const {
        list,
        calculateTotalProduct,
        handleRemove,
        handleCancelOrder,
        handleConfirmOrder,
        handleQuantityChange,
    } = useCartItem(cart);

    const [message, setMessage] = useState("");

    const handleItemRemove = (id) => {
        handleRemove(id);
        setMessage("Item removed successfully!");
    };

    if (cart.list.length === 0) {
        return (
            <Container className="text-center mt-5">
                <Alert variant="warning">
                    <Alert.Heading>Your shopping cart is empty </Alert.Heading>
                    <p>
                        It looks like you haven't added any products to your cart.
                    </p>
                    <Link to="/products">
                        <Button variant="primary">Show Products</Button>
                    </Link>
                </Alert>
            </Container>
        );
    }

    return (
        <div className="border rounded p-3 mb-4">
            {/* Message alert */}
            {message && <Alert variant="success" onClose={() => setMessage("")} dismissible>{message}</Alert>}
            <Row  className="align-items-center mb-3">
             {/* Product Name and Description */}
             <Col md={3}>
                 <h5>Product</h5>
             </Col>
             {/* Quantity Controls */}
             <Col md={3} className="text-center">
                 <span className="fw-bold">quantity</span>
             </Col>
             {/* Product Price */}
             <Col md={2} className="text-center">
                 <span className="fw-bold"> Unit Price DT</span>
             </Col>
             {/* Total Price */}
             <Col md={2} className="text-center">
                 <span className="fw-bold">total Price DT </span>
             </Col>
             {/* Remove Button */}
             <Col md={1} className="text-center">
             <span className="fw-bold"> Remove </span>

             </Col>
         </Row>
         <hr style={{ backgroundColor: "#fff" }} />

            {/* Map over cart.list to display each item */}
            {list?.length > 0 ? (
                list.map((item) => (
                    <Row key={item._id} className="align-items-center mb-3">
             
                        {/* Product Name and Description */}
                        <Col md={3}>
                            <h5>{item?.name}</h5>
                        </Col>
                        {/* Quantity Controls */}
                        <Col md={3} className="text-center">
                            <Button
                                variant="danger"
                                onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                className="me-2"
                                disabled={item.quantity <= 1}
                            >
                                -
                            </Button>
                            <span className="fw-bold">{item.quantity}</span>
                            <Button
                                variant="success"
                                onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                className="ms-2"
                            >
                                +
                            </Button>
                        </Col>
                        {/* Product Price */}
                        <Col md={2} className="text-center">
                            <span className="fw-bold">{item?.price.toLocaleString()} DT</span>
                        </Col>
                        {/* Total Price */}
                        <Col md={2} className="text-center">
                            <span className="fw-bold">{(item.price * item.quantity).toLocaleString()} DT</span>
                        </Col>
                        {/* Remove Button */}
                        <Col md={1} className="text-center">
                            <Button variant="light" onClick={() => handleItemRemove(item._id)}>
                                <Image
                                    src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
                                    width={30}
                                    height={30}
                                    alt="Remove Item"
                                />
                            </Button>
                        </Col>
                    </Row>
                ))
            ) : (
                <div className="text-center">
                    <Alert variant="warning">Your cart is empty.</Alert>
                </div>
            )}

            {/* Total and Actions */}
            {list?.length > 0 && (
                <div className="text-center mt-4">
                    <h4>Total: {calculateTotalProduct().toLocaleString()} DT</h4>
                    <Button variant="danger" onClick={handleCancelOrder} className="me-3">
                        Cancel Order
                    </Button>
                    <Button variant="success" onClick={handleConfirmOrder}>
                        Confirm Order
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CartItem;
