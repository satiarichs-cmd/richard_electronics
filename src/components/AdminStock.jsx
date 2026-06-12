import axios from "axios";
import { useEffect, useState } from "react";

const AdminStock = () => {

    const [products, setProducts] = useState([]);

    // LOAD PRODUCTS
    useEffect(() => {

        axios.get("https://ynwsatia.alwaysdata.net/api/get_product")
            .then((res) => {

                if (Array.isArray(res.data)) {
                    setProducts(res.data);
                }

            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    // UPDATE STOCK
    const updateStock = async (product_id, stock) => {

        try {

            const formData = new FormData();

            formData.append("product_id", product_id);
            formData.append("stock", stock);

            await axios.post(
                "https://ynwsatia.alwaysdata.net/api/update_stock",
                formData
            );

            // UPDATE UI
            setProducts(prev =>
                prev.map(item =>
                    item.product_id === product_id
                        ? { ...item, stock }
                        : item
                )
            );

            alert("Stock updated successfully");

        } catch (error) {

            console.log(error);
            alert("Failed to update stock");

        }
    };

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">
                📦 Admin Stock Panel
            </h2>

            <div className="row">

                {products.map((item) => (

                    <div
                        className="col-md-4 mb-4"
                        key={item.product_id}
                    >

                        <div className="card shadow p-3">

                            <img
                                src={`https://ynwsatia.alwaysdata.net/static/images/${item.product_image}`}
                                alt="product"
                                style={{
                                    height: "200px",
                                    objectFit: "contain"
                                }}
                            />

                            <h5 className="mt-3">
                                {item.product_name}
                            </h5>

                            <p className="text-muted">
                                Current Stock: {item.stock}
                            </p>

                            <input
                                type="number"
                                className="form-control"
                                defaultValue={item.stock}
                                id={`stock-${item.product_id}`}
                            />

                            <button
                                className="btn btn-dark mt-3"
                                onClick={() =>
                                    updateStock(
                                        item.product_id,
                                        document.getElementById(
                                            `stock-${item.product_id}`
                                        ).value
                                    )
                                }
                            >
                                Update Stock
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default AdminStock;