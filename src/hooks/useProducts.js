import { useState, useEffect } from "react";

import axios from "axios";

const useProducts = () => {
    const [products, setProducts] = useState([]);

    const [productSelected, setProductSelected] = useState(null);

    const [error, setError] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    // Fetch all products

    const getAllProducts = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get("http://localhost:4000/products");

            setProducts(response.data.payload);
        } catch (err) {
            setError(err.response?.data?.message || "Error fetching products");

            console.error("Error fetching products", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch product by ID

    const getProductById = async (id) => {
        try {
            setIsLoading(true);

            const response = await axios.get(`http://localhost:4000/products/${id}`);

            setProductSelected(response.data.payload);
        } catch (err) {
            setError(
                err.response?.data?.message || `Error fetching product with id: ${id}`
            );

            console.error("Error fetching product by ID", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Create a product

    const createProduct = async (productData) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                "http://localhost:4000/products",
                productData
            );
            setProducts((prevProducts) => {
                if (Array.isArray(prevProducts)) {
                    return [...prevProducts, response.data.payload];
                } else {
                    return [response.data.payload];
                }
            });

            getAllProducts();
        } catch (err) {
            setError(err.response?.data?.message || "Error creating product");
        } finally {
            setIsLoading(false);
        }
    };

    // Update a product

    const updateProduct = async (id, updatedData) => {
        try {
            setIsLoading(true);

            const response = await axios.put(
                `http://localhost:4000/products/${id}`,
                updatedData
            );

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === id ? response.data.payload : product
                )
            );
        } catch (err) {
            setError(
                err.response?.data?.message || `Error updating product with id: ${id}`
            );

            console.error("Error updating product", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Delete a product

    const deleteProduct = async (id) => {
        try {
            setIsLoading(true);

            await axios.delete(`http://localhost:4000/products/${id}`);

            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== id)
            );
        } catch (err) {
            setError(
                err.response?.data?.message || `Error deleting product with id: ${id}`
            );

            console.error("Error deleting product", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return {
        products,
        productSelected,
        setProductSelected,
        isLoading,
        error,
        setError,
        getAllProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
    };
};

export default useProducts;