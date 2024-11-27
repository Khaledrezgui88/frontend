import { useState, useEffect } from 'react';
import axios from 'axios';

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch all Categories
    const getAllCategories = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("http://localhost:4000/Categories");
            setCategories(response.data.payload);
        } catch (err) {
            setError(err.response?.data?.message || "Error fetching categories");
            console.error("Error fetching categories", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch Category by ID
    const getCategoryById = async (id) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:4000/Categories/${id}`);
            setCategorySelected(response.data.payload);
        } catch (err) {
            setError(err.response?.data?.message || `Error fetching category with id: ${id}`);
            console.error("Error fetching category by ID", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Create a Category
    const createCategory = async (categoryData) => {
        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:4000/Categories", categoryData);
            setCategories((prevCategories) => [...prevCategories, response.data.payload]);
            await getAllCategories(); // Met à jour la liste après la création
        } catch (err) {
            setError(err.response?.data?.message || "Error creating category");
            console.error("Error creating category", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Update a Category
    const updateCategory = async (id, updatedData) => {
        try {
            setIsLoading(true);
            const response = await axios.put(`http://localhost:4000/Categories/${id}`, updatedData);
            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category._id === id ? response.data.payload : category
                )
            );
        } catch (err) {
            setError(err.response?.data?.message || `Error updating category with id: ${id}`);
            console.error("Error updating category", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Delete a Category
    const deleteCategory = async (id) => {
        try {
            setIsLoading(true);
            await axios.delete(`http://localhost:4000/Categories/${id}`);
            setCategories((prevCategories) =>
                prevCategories.filter((category) => category._id !== id)
            );
        } catch (err) {
            setError(err.response?.data?.message || `Error deleting category with id: ${id}`);
            console.error("Error deleting category", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    return {
        categories,
        categorySelected,
        setCategorySelected,
        isLoading,
        error,
        setError,
        getAllCategories,
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory,
    };
};

export default useCategories;

