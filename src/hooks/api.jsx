import { useEffect, useState } from "react";
import axios from "axios";

export const usePostAPI = ({ url }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const postData = async (reqBody) => {
        setLoading(true);
        try {
            const response = await axios.post(url, reqBody);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, postData };
};

export const useGetAPI = ({ url }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async (reqBody) => {
            setLoading(true);
            try {
                const response = await axios.get(url, reqBody);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, reqBody]);

    return { data, error, loading };
};

export const usePutAPI = ({ url }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const putData = async (reqBody) => {
        setLoading(true);
        try {
            const response = await axios.put(url, reqBody);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();

    return { data, error, loading, putData };
};
