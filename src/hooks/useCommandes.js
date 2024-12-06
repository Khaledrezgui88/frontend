import { useState, useEffect } from "react";

import axios from "axios";

import { CgLayoutGrid } from "react-icons/cg";

import useProducts from "./useProducts.js";

import useUsers from "./useUsers.js";

const useCommandes = () => {
  const { getAllProducts, products } = useProducts();

  const { getAllUsers, users } = useUsers();

  const [commandes, setCommandes] = useState([]);

  const [commandeSelected, setCommandeSelected] = useState(null);

  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  // Fetch all commandes

  const getAllCommandes = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get("http://localhost:4000/commande");

      // Fetch users only once when commandes are fetched
      setCommandes(response.data.payload);

      getAllUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching commandes");

      console.error("Error fetching commandes", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch commande by ID

  const getCommandeById = async (id) => {
    try {
      setIsLoading(true);

      const response = await axios.get(`http://localhost:4000/commande/${id}`);

      setCommandeSelected(response.data.payload);
    } catch (err) {
      setError(
        err.response?.data?.message || `Error fetching commande with id: ${id}`
      );

      console.error("Error fetching commande by ID", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a commande

  const createCommande = async (commandeData) => {
    try {
      setIsLoading(true);

      await axios.post("http://localhost:4000/commande", commandeData);

      getAllCommandes();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating commande");

      console.error("Error creating commande", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update a commande

  const updateCommande = async (id, updatedData) => {
    if (!id) {
      console.error("No ID provided for updateCommande");

      setError("Invalid ID for updating commande");

      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.put(
        `http://localhost:4000/commande/${id}`,
        updatedData
      );

      setCommandes((prevCommandes) =>
        prevCommandes.map((commande) =>
          commande._id === id ? response.data.payload : commande
        )
      );
    } catch (err) {
      setError(
        err.response?.data?.message || `Error updating commande with id: ${id}`
      );

      console.error("Error updating commande", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a commande

  const deleteCommande = async (id) => {
    try {
      setIsLoading(true);

      await axios.delete(`http://localhost:4000/commande/${id}`);

      setCommandes((prevCommandes) =>
        prevCommandes.filter((commande) => commande._id !== id)
      );
    } catch (err) {
      setError(
        err.response?.data?.message || `Error deleting commande with id: ${id}`
      );

      console.error("Error deleting commande", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour obtenir le nom de l'utilisateur à partir de userId

  const getUserName = (userId) => {
    const user = users.find((user) => user._id === userId);

    return user ? `${user.firstName}  ${user.lasttName}` : "Unknown"; // Retourne 'Unknown' si l'utilisateur n'est pas trouvé
  };

  useEffect(() => {
    getAllCommandes();
    getAllProducts();
    getAllUsers();
  }, []);

  return {
    commandes,
    commandeSelected,
    setCommandeSelected,
    isLoading,
    error,
    setError,
    getAllCommandes,
    getCommandeById,
    createCommande,
    updateCommande,
    deleteCommande,
    getUserName,
    users,
    products,
  };
};

export default useCommandes;