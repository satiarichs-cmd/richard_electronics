import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Signin = () => {
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading("Authenticating...");

        try {
            const user_data = new FormData();

            user_data.append("email", email);
            user_data.append("password", password);

            const response = await axios.post(
                "https://ynwsatia.alwaysdata.net/api/signin",
                user_data
            );

            console.log(response);

            if (response.status === 200) {
                if (response.data.user) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.user)
                    );

                    setSuccess("✨ Login successful");

                    setTimeout(() => {
                        navigate("/");
                    }, 1500);
                }
            }
        } catch (error) {
            console.log(error);

            setLoading("");

            setError(
                "❌ Invalid email or password"
            );
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #020617, #0f172a, #1e293b)",
                overflow: "hidden",
            }}
        >
           

            {/* BACKGROUND GLOW */}
            <div
                style={{
                    position: "absolute",
                    width: "300px",
                    height: "300px",
                    background: "#3b82f6",
                    borderRadius: "50%",
                    filter: "blur(120px)",
                    top: "-100px",
                    left: "-100px",
                    opacity: 0.4,
                }}
            ></div>

            <div
                style={{
                    position: "absolute",
                    width: "250px",
                    height: "250px",
                    background: "#8b5cf6",
                    borderRadius: "50%",
                    filter: "blur(120px)",
                    bottom: "-80px",
                    right: "-80px",
                    opacity: 0.4,
                }}
            ></div>

            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-5 mt-5">
                        <div
                            style={{
                                background: "rgba(255,255,255,0.08)",
                                backdropFilter: "blur(14px)",
                                borderRadius: "28px",
                                padding: "40px",
                                boxShadow:
                                    "0 8px 32px rgba(0,0,0,0.4)",
                                border:
                                    "1px solid rgba(255,255,255,0.1)",
                                marginTop: "40px",
                            }}
                        >
                            {/* HEADER */}
                            <div className="text-center mb-4">
                                <div
                                    style={{
                                        width: "85px",
                                        height: "85px",
                                        borderRadius: "50%",
                                        background:
                                            "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                        margin: "auto",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: "35px",
                                        color: "white",
                                        boxShadow:
                                            "0 0 30px rgba(59,130,246,0.5)",
                                    }}
                                >
                                    🔐
                                </div>

                                <h1
                                    style={{
                                        color: "white",
                                        marginTop: "20px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Welcome Back
                                </h1>

                                <p
                                    style={{
                                        color: "#cbd5e1",
                                        fontSize: "15px",
                                    }}
                                >
                                    Sign in to continue to your dashboard
                                </p>
                            </div>

                            {/* ALERTS */}
                            {loading && (
                                <div className="alert alert-warning text-center">
                                    {loading}
                                </div>
                            )}

                            {error && (
                                <div className="alert alert-danger text-center">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success text-center">
                                    {success}
                                </div>
                            )}

                            {/* FORM */}
                            <form onSubmit={handelSubmit}>
                                {/* EMAIL */}
                                <div className="mb-4">
                                    <label
                                        style={{
                                            color: "white",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="form-control"
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            updateEmail(e.target.value)
                                        }
                                        style={{
                                            height: "55px",
                                            borderRadius: "15px",
                                            background:
                                                "rgba(255,255,255,0.12)",
                                            border: "none",
                                            color: "white",
                                        }}
                                    />
                                </div>

                                {/* PASSWORD */}
                                <div className="mb-4">
                                    <label
                                        style={{
                                            color: "white",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        required
                                        value={password}
                                        onChange={(e) =>
                                            updatePassword(e.target.value)
                                        }
                                        style={{
                                            height: "55px",
                                            borderRadius: "15px",
                                            background:
                                                "rgba(255,255,255,0.12)",
                                            border: "none",
                                            color: "white",
                                        }}
                                    />
                                </div>

                                {/* BUTTON */}
                                <button
                                    type="submit"
                                    className="btn w-100"
                                    style={{
                                        height: "55px",
                                        borderRadius: "15px",
                                        background:
                                            "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                        border: "none",
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "17px",
                                        transition: "0.3s",
                                        boxShadow:
                                            "0 4px 20px rgba(59,130,246,0.4)",
                                    }}
                                >
                                    🚀 Sign In
                                </button>

                                {/* SIGNUP LINK */}
                                <div className="text-center mt-4">
                                    <p style={{ color: "#cbd5e1" }}>
                                        Don't have an account?
                                    </p>

                                    <Link
                                        to="/signup"
                                        style={{
                                            textDecoration: "none",
                                            color: "#60a5fa",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Create Account
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;