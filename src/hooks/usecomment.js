// src/hooks/useComment.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useComments = () => {
    const [comments, setComments] = useState([]);
    const [commentSelected, setCommentSelected] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch all comments
    const getAllComments = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("http://localhost:4000/comments");
            setComments(response.data.payload);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching comments');
            console.error("Error fetching comments", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch comment by ID
    const getCommentById = async (id) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:4000/comment/${id}`);
            setCommentSelected(response.data.payload);
        } catch (err) {
            setError(err.response?.data?.message || `Error fetching comment with id: ${id}`);
            console.error("Error fetching comment by ID", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Create a comment
    const createComment = async (commentData) => {
        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:4000/comments", commentData);
            setComments((prevComments) => [...prevComments, response.data.payload]);
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating comment');
        } finally {
            setIsLoading(false);
        }
    };

    // Delete a comment
    const deleteComment = async (id) => {
        try {
            setIsLoading(true);
            await axios.delete(`http://localhost:4000/comment/${id}`);
            setComments(prevComments => prevComments.filter(comment => comment.id !== id));
        } catch (err) {
            setError(err.response?.data?.message || `Error deleting comment with id: ${id}`);
            console.error("Error deleting comment", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllComments();
    }, []);

    return {
        comments,
        commentSelected,
        setCommentSelected,
        isLoading,
        error,
        setError,
        getAllComments,
        getCommentById,
        createComment,
        deleteComment
    };
};

export default useComments;
