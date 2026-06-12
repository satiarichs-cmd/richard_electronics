import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Getproduct from "./components/Getproduct";
import Addproduct from "./components/Addproduct";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Makepayment from "./components/Makepayment";

import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import AdminStock from "./components/AdminStock";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./App.css";

function App() {

    // CART STATE
    const [cart] = useState([
        {
            product_id: 1,
            product_name: "iPhone 15",
            product_cost: 120000,
            quantity: 1
        },
        {
            product_id: 2,
            product_name: "Samsung TV",
            product_cost: 85000,
            quantity: 2
        }
    ]);

    // PRODUCT STATE
    const [products, setProducts] = useState([
        {
            product_id: 1,
            product_name: "iPhone 15",
            stock: 5
        },
        {
            product_id: 2,
            product_name: "Samsung TV",
            stock: 10
        }
    ]);

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Getproduct />}
                />

                <Route
                    path="/signin"
                    element={<Signin />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/addproduct"
                    element={<Addproduct />}
                />

                <Route
                    path="/makepayment"
                    element={<Makepayment />}
                />

                {/* CART */}
                <Route
                    path="/cart"
                    element={<Cart cart={cart} />}
                />

                {/* CHECKOUT */}
                <Route
                    path="/checkout"
                    element={<Checkout cart={cart} />}
                />

                {/* ADMIN STOCK */}
                <Route
                    path="/adminstock"
                    element={
                        <AdminStock
                            products={products}
                            setProducts={setProducts}
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;