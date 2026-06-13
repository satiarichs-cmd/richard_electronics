import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Getproduct = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        axios.get("https://ynwsatia.alwaysdata.net/api/get_product")
            .then((res) => {

                if (Array.isArray(res.data)) {
                    setProducts(res.data);
                } else {
                    setProducts([]);
                }

            })
            .catch((err) => {
                console.log(err);
                setProducts([]);
            });

    }, []);

    const goToPayment = (item) => {

        navigate("/makepayment", {
            state: {
                product: {
                    product_id: item.product_id,
                    product_name: item.product_name,
                    product_description: item.product_description,
                    product_category: item.product_category,
                    product_cost: item.product_cost,
                    product_image: item.product_image
                }
            }
        });

    };

    const addToCart = (item) => {

        const existing = cart.find(
            p => p.product_id === item.product_id
        );

        if (existing) {

            setCart(
                cart.map(p =>
                    p.product_id === item.product_id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                )
            );

        } else {

            setCart([
                ...cart,
                {
                    ...item,
                    quantity: 1
                }
            ]);

        }

        alert("Added to cart");

    };

    return (

        <div className="container py-3">

            <h2 className="text-center fw-bold mb-4">
                🛒 Our Products
            </h2>

            <div className="row">

                {products.length === 0 ? (

                    <h4 className="text-center">
                        No products found
                    </h4>

                ) : (

                    products.map((item) => (

                        <div
                            key={item.product_id}
                            className="col-6 col-md-3 col-lg-2 mb-3"
                        >

                            <div
                                className="card h-100 border-0 shadow-sm"
                                style={{
                                    borderRadius: "14px",
                                    overflow: "hidden",
                                    transition: "0.3s ease"
                                }}
                            >

                                {/* PRODUCT IMAGE */}
                                <div
                                    style={{
                                        height: "120px",
                                        backgroundColor: "#f8f9fa",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "8px"
                                    }}
                                >

                                    <img
                                        src={`https://ynwsatia.alwaysdata.net/static/images/${item.product_image}`}
                                        alt={item.product_name}
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            objectFit: "contain"
                                        }}
                                    />

                                </div>

                                {/* PRODUCT DETAILS */}
                                <div className="card-body p-2 d-flex flex-column">

                                    <span
                                        className="badge bg-primary mb-2"
                                        style={{
                                            width: "fit-content",
                                            fontSize: "9px"
                                        }}
                                    >
                                        {item.product_category}
                                    </span>

                                    <h6
                                        className="fw-bold"
                                        style={{
                                            fontSize: "12px",
                                            minHeight: "30px"
                                        }}
                                    >
                                        {item.product_name}
                                    </h6>

                                    <p
                                        className="text-light"
                                        style={{
                                            fontSize: "10px",
                                            minHeight: "30px",
                                            overflow: "hidden"
                                        }}
                                    >
                                        {item.product_description}
                                    </p>

                                    <h6 className="text-success fw-bold mt-auto">
                                        Ksh {item.product_cost}
                                    </h6>

                                    <button
                                        className="btn btn-outline-warning btn-sm w-100 mt-1"
                                        style={{
                                            fontSize: "10px"
                                        }}
                                        onClick={() => addToCart(item)}
                                    >
                                        🛒 Add To Cart
                                    </button>

                                    <button
                                        className="btn btn-success btn-sm w-100 mt-1"
                                        style={{
                                            fontSize: "10px"
                                        }}
                                        onClick={() => goToPayment(item)}
                                    >
                                        Buy Now
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

};

export default Getproduct;