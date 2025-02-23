import React from "react";
import React, { useEffect } from "react";
import { createContext } from "react";
import { axiosInstance } from "./axios";

export const AuthContext = createContext();

const AuthProvider = ({ childern }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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
    return <AuthProvider.Provider value={{ isAuthenticated, isLoading }}>{childern}</AuthProvider.Provider>;
};

export default AuthContext;
