import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import ProductCard from "../components/product-card";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getProducts = async () => {
        try {
            const response = await axiosInstance.get("/users/get-products");
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <h1>Products</h1>
                <div>
                    <button onClick={() => navigate("/cart")} className="text-white mx-4">
                        Cart
                    </button>
                    <button onClick={() => navigate("/orders")} className="text-white mx-4">
                        Orders
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap gap-10 justify-center mt-10">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;
