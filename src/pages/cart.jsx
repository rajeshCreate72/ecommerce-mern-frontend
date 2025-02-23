import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { AuthContext } from "../config/authContext";
import ProductCard from "../components/product-card";

const Cart = () => {
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const getCart = async () => {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        try {
            const response = await axiosInstance.get("/cart/get-cart", { user });
            setProducts(response.data.cart.items);
        } catch (error) {
            setIsLoading(false);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCart();
    }, []);

    if (isLoading) return <Loading />;

    return (
        <div>
            <h1>Cart</h1>
            <h4>{products === null && "No products"}</h4>
            <h4>{error && "Check the network"}</h4>
        </div>
    );
};

export default Cart;
