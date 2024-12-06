import { useEffect, useState } from 'react'
import axios from 'axios'

const useExamples = () => {
    const [examples, setExamples] = useState([])
    const [exampleSelected, setExampleSelected] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    // Get All Examples
    const getAllExamples = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get("http://localhost:4000/examples")
            setExamples(response.data.payload)
        } catch (error) {
            setError(error?.data?.message || 'Error fetching examples')
            console.error("Error getting all examples", error)
        } finally {
            setIsLoading(false)
        }
    }

    // Get One Example
    const getExampleById = async (id) => {
        try {
            setIsLoading(true)
            const response = await axios.get(`http://localhost:4000/examples/${id}`)
            setExampleSelected(response.data.payload)
        } catch (error) {
            setError(error?.data?.message || `Error fetching example with id: ${id}`)
            console.error("Error getting example by id", error)
        } finally {
            setIsLoading(false)
        }
    }

    // Create an Example
    const createExample = async (exampleData) => {
        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:4000/examples", exampleData);
            // Check if prevExamples is an array before updating the state
            setExamples((prevExamples) => {
                // If prevExamples is an array, add the new example to the array
                if (Array.isArray(prevExamples)) {
                    return [...prevExamples, response.data.payload];  // Spread the old examples and add the new one
                } else {
                    return [response.data.payload];  // Return an array with the newly created example
                }
            });
            getAllExamples()
        } catch (error) {
            setError(error.response?.data?.message || 'Error creating example');
            console.error("Error creating example", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Update an Example
    const updateExample = async (id, updatedData) => {
        try {
            setIsLoading(true)
            const response = await axios.put(`http://localhost:4000/examples/${id}`, updatedData)
            setExamples(prevExamples =>
                prevExamples.map(example => example.id === id ? response.data.payload : example)
            )
            setExampleSelected(response.data.payload)

            getAllExamples()
        } catch (error) {
            setError(error.response?.data?.message || `Error updating example with id: ${id}`)
            console.error("Error updating example", error)
        } finally {
            setIsLoading(false)
        }
    }

    // Delete an Example
    const deleteExample = async (id) => {
        try {
            setIsLoading(true)
            await axios.delete(`http://localhost:4000/examples/${id}`)
            setExamples(prevExamples => prevExamples.filter(example => example.id !== id))
            setExampleSelected(null)
            getAllExamples();
        } catch (error) {
            setError(error.response?.data?.message || `Error deleting example with id: ${id}`)
            console.error("Error deleting example", error)
        } finally {
            setIsLoading(false)
        }
    }

    // Effect to load examples on component mount
    useEffect(() => {
        getAllExamples()
    }, [])

    return {
        examples,
        exampleSelected,
        setExampleSelected,
        isLoading,
        error,
        setError,
        getAllExamples,
        getExampleById,
        createExample,
        updateExample,
        deleteExample
    };
}

export default useExamples
