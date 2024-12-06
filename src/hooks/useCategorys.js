import { useState, useEffect } from 'react';
import axios from 'axios';

const useCategorys = () => {
    const [categories, setCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch all Categorys
    const getAllCategorys = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("http://localhost:4000/Category");
            setCategories(response.data.payload);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching Categorys');
            console.error("Error fetching Categorys", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch Category by ID
    const getCategoryById = async (id) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:4000/Category/${id}`);
            setCategorySelected(response.data.payload);
        } catch (err) {
            setError(err.response?.data?.message || `Error fetching Category with id: ${id}`);
            console.error("Error fetching Category by ID", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Create a Category
    const createCategory = async (categoryData) => {
        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:4000/Category", categoryData);
            setCategories((prevCategorys) => {
                if (Array.isArray(prevCategorys)) {
                    return [...prevCategorys, response.data.payload];
                } else {
                    return [response.data.payload]
                }
            }
            );
            getAllCategorys()
        } catch (err) {

            setError(err.response?.data?.message || 'Error creating Category');
            console.error("Error creating Category", err);
        } finally {
            setIsLoading(false);
        }
    };


    // Update a Category
    const updateCategory = async (id, updatedData) => {
        try {
            setIsLoading(true);
            const response = await axios.put(`http://localhost:4000/Category/${id}`, updatedData);
            setCategories(prevCategorys =>
                prevCategorys.map(category => category._id === id ? response.data.payload : category)
            );
        } catch (err) {
            setError(err.response?.data?.message || `Error updating Category with id: ${id}`);
            console.error("Error updating Category", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Delete a Category
    const deleteCategory = async (id) => {
        try {
            setIsLoading(true);
            await axios.delete(`http://localhost:4000/Category/${id}`);
            setCategories(prevCategorys => prevCategorys.filter(category => category._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || `Error deleting Category with id: ${id}`);
            console.error("Error deleting Category", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllCategorys();
    }, []);

    return {
        categories,
        categorySelected,
        setCategorySelected,
        isLoading,
        error,
        setError,
        getAllCategorys,
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory
    };
};

export default useCategorys;

