import axios from "axios";

const API_URL = "http://localhost:4000";

// Create example
const create = async (exampleData) => {
    try {
        const response = await axios.post(`${API_URL}/example`, exampleData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Read all examples
const getAll = async () => {
    try {
        const response = await axios.get(`${API_URL}/example`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Read example by ID
const getById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/example/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Update example
const update = async (id, exampleData) => {
    try {
        const response = await axios.put(`${API_URL}/example/${id}`, exampleData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Delete example
const remove = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/example/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const exampleService = {
    create,
    getAll,
    getById,
    update,
    remove,
};

export default exampleService;
