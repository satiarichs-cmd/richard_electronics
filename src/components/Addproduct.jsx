import axios from "axios";
import { useState } from "react";

const Addproduct = () => {
    const [product_name, setproductName] = useState("");
    const [product_description, setproductDescription] = useState("");
    const [product_category, setproductCategory] = useState("");
    const [product_cost, setproductCost] = useState("");
    const [product_image, setproductImage] = useState(null);

    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading("Uploading product...");
        setError("");
        setSuccess("");

        // VALIDATION
        if (!product_image) {
            setLoading("");
            setError("Please select an image");
            return;
        }

        try {
            const formData = new FormData();

            formData.append("product_name", product_name);
            formData.append("product_description", product_description);
            formData.append("product_category", product_category);
            formData.append("product_cost", product_cost);
            formData.append("product_image", product_image);

            const response = await axios.post(
                "https://ynwsatia.alwaysdata.net/api/add_product",
                formData
            );

            if (response.status === 200) {
                setSuccess("✨ Product added successfully");
                setLoading("");

                // RESET FORM
                setproductName("");
                setproductDescription("");
                setproductCategory("");
                setproductCost("");
                setproductImage(null);

                // reset file input visually
                document.getElementById("imageInput").value = "";
            }

        } catch (err) {
            setLoading("");
            setError("❌ Failed to upload product");
        }
    };

    return (
        <div className="container py-5 text-white">

            <div className="col-md-7 mx-auto p-4"
                style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(15px)",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.1)"
                }}
            >

                <h2 className="text-center mb-3">➕ Add Product</h2>

                {/* STATUS */}
                {error && <div className="alert alert-danger">{error}</div>}
                {loading && <div className="alert alert-warning">{loading}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Product Name"
                        value={product_name}
                        onChange={(e) => setproductName(e.target.value)}
                        required
                    />

                    <textarea
                        className="form-control mb-3"
                        placeholder="Product Description"
                        value={product_description}
                        onChange={(e) => setproductDescription(e.target.value)}
                        required
                    />

                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Price"
                        value={product_cost}
                        onChange={(e) => setproductCost(e.target.value)}
                        required
                    />

                    {/* SAME CATEGORIES AS GETPRODUCT */}
                    <select
                        className="form-control mb-3 bg-dark"
                        value={product_category}
                        onChange={(e) => setproductCategory(e.target.value)}
                        required
                        
                    >
                        <option value="">Select Category</option>
                        <option value="phones">Phones</option>
                        <option value="laptop">Laptops</option>
                        <option value="television">TVs</option>
                        <option value="accessories">Accessories</option>
                    </select>

                    <input
                        id="imageInput"
                        type="file"
                        className="form-control mb-3"
                        accept="image/*"
                        onChange={(e) => setproductImage(e.target.files[0])}
                        required
                    />

                    <button
                        className="btn btn-primary w-100"
                        type="submit"
                    >
                        🚀 Upload Product
                    </button>

                </form>

            </div>
        </div>
    );
};

export default Addproduct;