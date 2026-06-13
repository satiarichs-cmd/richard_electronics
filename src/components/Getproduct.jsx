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

        <div className="container mt-4">

            <h2 className="text-center fw-bold mb-4">
                🛒 Products
            </h2>

            <div className="row">

                {products.length === 0 ? (
                    <h4 className="text-center">No products found</h4>
                ) : (

                    products.map((item) => (

                        <div
                            key={item.product_id}
                            className="col-3 col-lg-2 mb-4"
                        >

                            <div
                                className="card h-100 border-0 shadow-sm text-center"
                                style={{
                                    borderRadius: "18px",
                                    overflow: "hidden",
                                    transition: "0.3s ease",
                                    cursor: "pointer"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "";
                                }}
                            >

                                {/* PRODUCT IMAGE */}
                                <div
                                    style={{
                                        height: "150px",
                                        backgroundColor: "#f8f9fa",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "10px"
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
                                <div className="card-body p-2">

                                    <span
                                        className="badge bg-primary mb-2"
                                        style={{
                                            fontSize: "10px",
                                            borderRadius: "20px"
                                        }}
                                    >
                                        {item.product_category}
                                    </span>

                                    <h6
                                        className="fw-bold"
                                        style={{
                                            fontSize: "13px",
                                            minHeight: "38px"
                                        }}
                                    >
                                        {item.product_name}
                                    </h6>
<p
    className="text-muted mb-2"
  style={{
    fontSize: "11px",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden"
}}
>
    {item.product_description}
</p>
                                    <div
                                        className="text-success fw-bold mb-2"
                                        style={{
                                            fontSize: "14px"
                                        }}
                                    >
                                        Ksh {item.product_cost}
                                    </div>

                                    <button
                                        className="btn btn-outline-warning btn-sm w-100 mb-2"
                                        onClick={() => addToCart(item)}
                                    >
                                        🛒 Add To Cart
                                    </button>

                                    <button
                                        className="btn btn-success btn-sm w-100"
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