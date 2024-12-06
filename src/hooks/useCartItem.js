import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from '../redux/cart/cart.slice.js';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

const useCartItem = (data = {}) => { // default value for data
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const list = cart.list;

    // Check if data is defined, otherwise set default values
    const quantityInitial = data?.quantity || 1;
    const priceInitial = data?.price || 0;
    const [quantity, setQuantity] = useState(quantityInitial);
    const [totalPrice, setTotalPrice] = useState(priceInitial * quantity);
    const [error, setError] = useState('');

    useEffect(() => {
        if (data?._id) {  // Only dispatch if data is valid
            setTotalPrice(data?.price * quantity);
            dispatch(updateQuantity({ _id: data._id, quantity }));
        }
    }, [quantity, data?.price, data?._id, dispatch]);

    const calculateTotalProduct = () => {
        if (list.length === 0) return 0;
        return list.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    };

    const handleRemove = (id) => {
            dispatch(removeItem({ _id: id }));
    };

    const handleQuantityChange = (_id, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity({ _id, quantity: newQuantity }));
        }
    };


    const handleCancelOrder = async () => {
        if (!currentUser?._id) {
            setError("User is not authenticated.");
            return;
        }

        const products = list.map(product => ({
            productId: product._id,
            quantite: product.quantity,
            prixUnitaire: product.price,
        }));

        const commandeCanceled = {
            userId: currentUser._id,
            products,
            status: "Canceled"
        };

        try {
            await axios.post('http://localhost:4000/commande/addCommande', commandeCanceled);
            toast.error('Order has been canceled');
            navigate('/products');
        } catch (error) {
            console.error('Error while creating the canceled order', error);
            setError("Failed to cancel the order.");
        }
    };
    
    const handleConfirmOrder = async () => {
        if (!currentUser?._id) {
            setError("User is not authenticated.");
            return;
        }
        
        const products = list.map(product => ({
            productId: product._id,
            quantity: product.quantity,
        }));

        const commandeDone = {
            userId: currentUser._id,
            products,
            totalPrice: calculateTotalProduct()
        };
        try {
            console.log("currentUser",currentUser)

            await axios.post('http://localhost:4000/commande', commandeDone);
            toast.success('Proceed to Payment');
            navigate('/paiement');
        } catch (error) {
            console.error('Error while creating the order', error);
            setError("Failed to confirm the order.");
        }
    };

    return {
        list,
        calculateTotalProduct,
        handleRemove,
        handleQuantityChange,
        handleConfirmOrder,
        handleCancelOrder,
    };
};

export default useCartItem;
