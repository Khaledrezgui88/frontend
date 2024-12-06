import React, { useEffect } from 'react';
import { Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ShopIcon } from '../../../assets/icons/Icons.jsx';
import Loader from '../../../components/loader/Loader.jsx';
import { truncateText } from '../../../assets/utils/helpers.js';
import usePagination from '../../../hooks/usePagination.js';
import useProducts from '../../../hooks/useProducts.js';
import Pagination from '../../../components/paggination/Paggination.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/cart/cart.slice.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'react-bootstrap/Image';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // Accessing cart state from Redux
    const cart = useSelector((state) => state.cart.list);

    // Custom hook for managing products
    const {
        products,
        isLoading,
        error,
        getAllProducts
    } = useProducts();

    // Hook for managing pagination
    const { currentPage, currentItems, totalPages, handlePageChange } =
        usePagination(products, 3); // Number of items per page (default: 6)

    useEffect(() => {
        getAllProducts(); // Fetch products when the component is mounted
    }, []);

    // Handle adding a product to the cart
    const handleAddToCart = (product) => {
        const isInCart = cart.some((item) => item._id === product._id);
        if (isInCart) {
            toast.info(`${product.name} is already in your cart!`, {
                position: "bottom-right",
                autoClose: 3000,
            });
        } else {
            dispatch(addToCart({ ...product, quantity: 1 }));
            toast.success(`${product.name} has been added to the cart!`, {
                position: "bottom-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="container mt-4">
            {/* Display an error message if it exists */}
            {error && <Alert variant="danger">{error}</Alert>}

            <div className="d-flex justify-content-between">
                <h1>Products</h1>
            </div>

            {/* Show a loader while data is being fetched */}
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {/* Display products as cards */}
                    <Row>
                        {currentItems?.length > 0 ? (
                            currentItems.map((product) => {
                                const isInCart = cart.some((item) => item._id === product._id);
                                return (
                                    <Col key={product._id} md={4} className="mb-4">
                                        <Card>
                                            <Card.Img
                                                variant="top"
                                                src={product.image}
                                                alt={product.name}
                                                height={200}
                                            />
                                            <Card.Body>
                                                <Card.Title>{truncateText(product.name, 15)}</Card.Title>
                                                <Card.Text>{truncateText(product.description, 15)}</Card.Text>
                                                <h5>${product.price}</h5>
                                                {isInCart ? (
                                                    <Button variant="secondary" disabled>
                                                        In Cart
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="primary"
                                                        onClick={() => handleAddToCart(product)}
                                                        className="me-2"
                                                    >
                                                        <ShopIcon /> Add to Cart
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="primary"
                                                    onClick={() => navigate(`/product/${product._id}`)}
                                                >
                                                    View Product
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })
                        ) : (
                            <p>No products found</p>
                        )}
                    </Row>

                    {/* Display pagination */}
                    {currentItems?.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            disabled={currentItems?.length === 0}
                        />
                    )}
                </>
            )}
            {/* Toast notification container */}
            <ToastContainer />
        </div>
    );
};

export default ProductsPage;
