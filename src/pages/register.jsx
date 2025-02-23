import React, { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../components/validator";
import { axiosInstance } from "../config/axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const validations = {
        minLength: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        specialChar: /[@$!%*?&]/.test(password),
        onlyAllowedChars: /^[A-Za-z\d@$!%*?&]+$/.test(password),
    };

    const postUser = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post("/users/register", { name, email, password });
            setData(response.data);
            localStorage.setItem("token", response.data.token);
            navigate("/");
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
            setEmailError(false);
        } else {
            setEmailError(true);
            return;
        }
        if (validatePassword(password)) {
            setPasswordError(false);
        } else {
            setPasswordError(true);
            return;
        }
        postUser();
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    });

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-5xl/9 font-bold tracking-tight text-gray-900">Register</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                            Full name
                        </label>
                        <div className="mt-2">
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                id="name"
                                name="name"
                                type="text"
                                required
                                autoComplete="name"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-green-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                style={{ outline: emailError && "red 2px solid" }}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                style={{ outline: passwordError && "red 2px solid" }}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        <div className="flex flex-col justify-start items-start bg-gray-200 p-2 border rounded-md mt-2">
                            <p className={validations.minLength ? "text-green-600" : "text-black"}>
                                Must be at least 8 characters long.
                            </p>
                            <p className={validations.lowercase ? "text-green-600" : "text-black"}>
                                Must include at least one lowercase letter (a-z).
                            </p>
                            <p className={validations.uppercase ? "text-green-600" : "text-black"}>
                                Must include at least one uppercase letter (A-Z).
                            </p>
                            <p className={validations.number ? "text-green-600" : "text-black"}>
                                Must include at least one number (0-9).
                            </p>
                            <p className={validations.specialChar ? "text-green-600" : "text-black"}>
                                Must include at least one special character (@$!%*?&).
                            </p>
                            <p className={validations.onlyAllowedChars ? "text-green-600" : "text-black"}>
                                Cannot contain other special characters outside @$!%*?&.
                            </p>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Already a member?{" "}
                    <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
