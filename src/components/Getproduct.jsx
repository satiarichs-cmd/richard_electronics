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

        <div className="container mt-5">

            <h2 className="text-center mb-4">
                🛒 Products
            </h2>

            <div className="row justify-content-center">

                {products.length === 0 ? (
                    <h4 className="text-center">No products found</h4>
                ) : (

                    products.map((item) => (

                        <div
                            key={item.product_id}
                            className="col-3 d-flex justify-content-center mb-4"
                        >

                            <div
                                className="card shadow p-2 text-center border-0"
                                style={{
                                    width: "100%",
                                    borderRadius: "16px"
                                }}
                            >

                                <div
                                    style={{
                                        height: "120px",
                                        width: "100%",
                                        backgroundColor: "#f8f9fa",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "5px"
                                    }}
                                >

                                    <img
                                        src={`https://ynwsatia.alwaysdata.net/static/images/${item.product_image}`}
                                        alt="product"
                                        style={{
                                            maxHeight: "100%",
                                            maxWidth: "100%",
                                            objectFit: "contain"
                                        }}
                                    />

                                </div>

                                <div className="card-body p-2">

                                    <h6
                                        className="card-title"
                                        style={{ fontSize: "12px" }}
                                    >
                                        {item.product_name}
                                    </h6>

                                    <p
                                        className="text-light"
                                        style={{
                                            fontSize: "10px",
                                            marginBottom: "5px"
                                        }}
                                    >
                                        {item.product_description}
                                    </p>

                                    <h6
                                        className="text-success"
                                        style={{ fontSize: "11px" }}
                                    >
                                        Ksh {item.product_cost}
                                    </h6>

                                    <span
                                        className="badge bg-primary mb-2"
                                        style={{ fontSize: "9px" }}
                                    >
                                        {item.product_category}
                                    </span>

                                    <button
                                        className="btn btn-warning w-100 mt-1"
                                        style={{ fontSize: "10px" }}
                                        onClick={() => addToCart(item)}
                                    >
                                        Add To Cart
                                    </button>

                                    <button
                                        className="btn btn-success w-100 mt-1"
                                        style={{ fontSize: "10px" }}
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