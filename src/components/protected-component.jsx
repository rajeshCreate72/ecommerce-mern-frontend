import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const ProtectedComponent = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const validateToken = async () => {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
        }
        try {
            const response = await axiosInstance.get("/users/authenticate", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsAuthenticated(response.data.login);
        } catch (error) {
            setIsAuthenticated(false);
            navigate("/login");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        validateToken();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedComponent;
