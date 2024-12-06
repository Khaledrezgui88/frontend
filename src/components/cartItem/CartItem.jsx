import React from 'react';
import { Button, Image, Row, Col } from 'react-bootstrap';
import useCartItem from '../../hooks/useCartItem.jsx';
import { useSelector } from 'react-redux';

const CartItem = ({ data }) => {
    // Retrieving cart from Redux state
  const cart = useSelector((state) => state.cart);

    const { quantity, setQuantity, totalPrice, list, calculerTotalProduct, handleRemove } = useCartItem(cart);



    return (
        <div className="border rounded p-3 mb-4">
            <Row className="align-items-center">
                <Col md={2} className="text-center">
                    <Image src={data.image} rounded fluid width={50} />
                </Col>
                <Col md={3}>
                    <h5>{data.nom}</h5>
                    <p className="text-muted">{data.description}</p>
                </Col>
                <Col md={3} className="text-center">
                    <Button
                        variant="danger"
                        onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                        className="me-2"
                    >
                        -
                    </Button>
                    <span className="fw-bold">{quantity}</span>
                    <Button
                        variant="success"
                        onClick={() => setQuantity(q => q + 1)}
                        className="ms-2"
                    >
                        +
                    </Button>
                </Col>
                <Col md={2} className="text-center">
                    <span className="fw-bold">{data?.prix} DT</span>
                </Col>
                <Col md={2} className="text-center">
                    <span className="fw-bold">{totalPrice} DT</span>
                </Col>
                <Col md={1} className="text-center">  
                    <Button variant="danger" onClick={handleRemove(data.id)}>
                        <Image src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" width={30} height={30} />
                    </Button>
                </Col>
            </Row>

            {list[list.length - 1]?._id === data?._id && (
                <div className="text-center mt-4">
                    <h4>Total: {calculerTotalProduct()} DT</h4>
                    <Button variant="danger" onClick={()=>{}} className="me-3">
                        Cancel Order
                    </Button>
                    <Button variant="success" onClick={()=>{}}>
                        Confirm Order
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CartItem;
