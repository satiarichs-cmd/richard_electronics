import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Makepayment = () => {
const location = useLocation();
const navigate = useNavigate();

const product = location.state?.product || null;

const [phone, setPhone] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");

const img_url = "https://ynwsatia.alwaysdata.net/static/images/";

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product) return setError("No product selected");

    setLoading(true);
    setError("");
    setSuccess("");

    try {
        const form = new FormData();
        form.append("amount", product.product_cost);
        form.append("phone", phone);

        await axios.post(
            "https://ynwsatia.alwaysdata.net/api/mpesa_payment",
            form
        );

        setSuccess("STK Push sent successfully.");
        setPhone("");
    } catch (err) {
        setError("Payment failed. Try again.");
    } finally {
        setLoading(false);
    }
};

if (!product) {
    return (
        <div className="empty-page">
            <div className="empty-box">
                <h3>No product selected</h3>

                <button
                    className="back-btn"
                    onClick={() => navigate("/")}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}

return (
    <div className="payment-page">

        <div className="container py-5">

            <div className="checkout-wrapper">

                {/* PRODUCT SIDE */}
                <div className="product-section">

                    <div className="image-wrapper">
                        <img
                            src={img_url + product.product_image}
                            alt="product"
                            className="product-image"
                        />
                    </div>

                    <div className="product-content">

                        <span className="tag">
                            Premium Collection
                        </span>

                        <h2 className="product-name">
                            {product.product_name}
                        </h2>

                        <p className="description">
                            {product.product_description}
                        </p>

                        <div className="divider"></div>

                        <div className="details">

                            <div className="detail-item">
                                <small>Price</small>
                                <h4>Ksh {product.product_cost}</h4>
                            </div>

                            <div className="detail-item">
                                <small>Product ID</small>
                                <p>#SN1024</p>
                            </div>

                        </div>

                    </div>
                </div>

                {/* PAYMENT SIDE */}
                <div className="payment-section">

                    <div className="payment-top">

                        <div className="mpesa-icon">
                            M
                        </div>

                        <h2>
                            LIPA NA M-PESA
                        </h2>

                        <p>
                            Secure mobile payment
                        </p>

                    </div>

                    <div className="amount-box">

                        <span>Total Amount</span>

                        <h1>
                            Ksh {product.product_cost}
                        </h1>

                    </div>

                    {loading && (
                        <div className="alert alert-info">
                            Processing payment...
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <label>
                            Phone Number
                        </label>

                        <div className="input-group-custom">

                            <span>+254</span>

                            <input
                                type="text"
                                color="black"
                                placeholder="7XXXXXXXX"
                                value={phone}
                                onChange={(e) =>
                                    setPhone(e.target.value)
                                }
                                required
                            />

                        </div>

                        <small className="hint">
                            Enter your M-PESA number
                        </small>

                        <button
                            className="pay-button"
                            disabled={loading}
                        >
                            {loading ? "Sending STK..." : "Pay Now"}
                        </button>

                    </form>

                    <div className="notice">
                        Ensure your phone is active to receive the STK push.
                    </div>

                </div>

            </div>

        </div>

        <style>{`

            *{
                font-family: 'Poppins', sans-serif;
            }

            .payment-page{
                min-height:100vh;
                background:#f4f6f9;
            }

            .checkout-wrapper{
                display:grid;
                grid-template-columns:1fr 380px;
                width:100%;
                max-width:800px;
                margin:auto;
                background:#fff;
                border-radius:24px;
                overflow:hidden;
                box-shadow:0 10px 35px rgba(0,0,0,0.08);
            }

            .container{
                display:flex;
                justify-content:center;
            }

            /* LEFT SIDE */
            .product-section{
                padding:35px;
                background:#ffffff;
            }

            .image-wrapper{
                width:100%;
                height:320px;
                overflow:hidden;
                border-radius:20px;
                background:#f3f4f6;
            }

            .product-image{
                width:100%;
                height:100%;
                object-fit:cover;
                transition:0.4s;
            }

            .product-image:hover{
                transform:scale(1.04);
            }

            .product-content{
                margin-top:30px;
            }

            .tag{
                background:#dcfce7;
                color:#15803d;
                padding:7px 14px;
                border-radius:50px;
                font-size:13px;
                font-weight:600;
            }

            .product-name{
                margin-top:18px;
                font-size:2.2rem;
                font-weight:700;
                color:#111827;
            }

            .description{
                margin-top:12px;
                color:#6b7280;
                line-height:1.8;
                max-width:90%;
            }

            .divider{
                width:100%;
                height:1px;
                background:#e5e7eb;
                margin:30px 0;
            }

            .details{
                display:flex;
                gap:50px;
                flex-wrap:wrap;
            }

            .detail-item small{
                color:#9ca3af;
                display:block;
                margin-bottom:6px;
            }

            .detail-item h4{
                color:#16a34a;
                font-weight:700;
            }

            .detail-item p{
                font-weight:600;
                color:#111827;
                margin:0;
            }

            /* RIGHT SIDE */
            .payment-section{
                background:#fafafa;
                padding:40px 30px;
                border-left:1px solid #e5e7eb;
                display:flex;
                flex-direction:column;
                justify-content:center;
            }

            .payment-top{
                text-align:center;
                margin-bottom:35px;
            }

            .mpesa-icon{
                width:65px;
                height:65px;
                background:#16a34a;
                color:white;
                border-radius:18px;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:28px;
                font-weight:700;
                margin:auto auto 18px;
            }

            .payment-top h2{
                font-size:2rem;
                font-weight:700;
                color:#15803d;
                margin-bottom:8px;
            }

            .payment-top p{
                color:#6b7280;
            }

            .amount-box{
                background:white;
                border:1px solid #e5e7eb;
                border-radius:18px;
                padding:25px;
                text-align:center;
                margin-bottom:30px;
            }

            .amount-box span{
                color:#6b7280;
                font-size:14px;
            }

            .amount-box h1{
                color:#16a34a;
                font-size:2.4rem;
                margin-top:10px;
                font-weight:800;
            }

            label{
                font-weight:600;
                margin-bottom:10px;
                display:block;
                color:#111827;
            }

            .input-group-custom{
                display:flex;
                align-items:center;
                background:white;
                border:1px solid #d1d5db;
                border-radius:14px;
                overflow:hidden;
                margin-bottom:8px;
            }

            .input-group-custom span{
                background:#f3f4f6;
                padding:14px 18px;
                color:#374151;
                font-weight:600;
                border-right:1px solid #e5e7eb;
            }

           .input-group-custom input{
    border:none;
    outline:none;
    width:100%;
    padding:15px;
    font-size:15px;
    background:transparent;
    color:#111827 !important;   /* 🔥 force black text */
    -webkit-text-fill-color:#111827; /* 🔥 fixes Chrome/Safari invisibility */
    opacity:1;
}
            .hint{
                color:#6b7280;
                font-size:13px;
                margin-bottom:25px;
                display:block;
            }

            .pay-button{
                width:100%;
                border:none;
                background:#16a34a;
                color:white;
                padding:16px;
                border-radius:14px;
                font-size:17px;
                font-weight:700;
                transition:0.3s;
                box-shadow:0 8px 20px rgba(22,163,74,0.2);
            }

            .pay-button:hover{
                background:#15803d;
                transform:translateY(-2px);
            }

            .pay-button:disabled{
                opacity:0.7;
            }

            .notice{
                margin-top:20px;
                background:#fef9c3;
                color:#854d0e;
                padding:14px;
                border-radius:12px;
                font-size:14px;
                border:1px solid #fde68a;
            }

            .empty-page{
                min-height:100vh;
                background:#f4f6f9;
            }

            .empty-box{
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                height:80vh;
            }

            .back-btn{
                margin-top:20px;
                border:none;
                background:#16a34a;
                color:white;
                padding:12px 22px;
                border-radius:10px;
                font-weight:600;
            }

            @media(max-width:992px){
                .checkout-wrapper{
                    grid-template-columns:1fr;
                }
            }

        `}</style>
    </div>
);
};

export default Makepayment;