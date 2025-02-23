import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/product-card";
import Loading from "../components/Loading";

const Home = () => {
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const getProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get("/users/get-products");
            setProducts(response.data);
        } catch (error) {
            setIsLoading(false);
            setError(error.response.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    if (error) return <h1>{error}</h1>;

    if (isLoading) return <Loading />;

    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <h1>Products</h1>
                <div>
                    <button onClick={() => (window.location.href = "/cart")} className="text-white mx-4">
                        Cart
                    </button>
                    <button onClick={() => (window.location.href = "/orders")} className="text-white mx-4">
                        Orders
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}
                        className="text-white mx-4"
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap gap-10 justify-center mt-10">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </>
    );
};

export default Home;
