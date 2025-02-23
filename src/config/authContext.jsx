import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { axiosInstance } from "./axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const validateToken = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }
            const response = await axiosInstance.get("/users/authenticate", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsAuthenticated(response.data.login);
            setUser(response.data.userId);
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        validateToken();
    }, []);
    return <AuthContext.Provider value={{ isAuthenticated, isLoading, user }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
