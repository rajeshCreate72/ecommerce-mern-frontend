import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import { useNavigate } from "react-router-dom";

const ProtectedComponent = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const validateToken = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsAuthenticated(false);
                return;
            }
            const response = await axiosInstance.get("/users/authenticate", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsAuthenticated(response.data.login);
        } catch (error) {
            setError(error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        validateToken();
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, []);

    return <div>{isAuthenticated && children}</div>;
};

export default ProtectedComponent;
