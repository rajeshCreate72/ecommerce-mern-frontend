import { axiosInstance } from "../config/axios";

export const getOrders = async ({ user }) => {
    const response = await axiosInstance.get("/orders", user);
    return response.data;
};

export const getCart = async ({ user }) => {
    const response = await axiosInstance.get("/cart", user);
    return response.data;
};
