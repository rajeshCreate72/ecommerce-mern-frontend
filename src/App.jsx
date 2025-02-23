import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import Orders from "./pages/orders";
import ProtectedComponent from "./components/protected-component";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/cart"
                    element={
                        <ProtectedComponent>
                            <Cart />
                        </ProtectedComponent>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <ProtectedComponent>
                            <Orders />
                        </ProtectedComponent>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
