import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


const Signup = () => {
    const [username, updateUsername] = useState("");
    const [email, updateEmail] = useState("");
    const [phone, updatePhone] = useState("");
    const [password, updatePassword] = useState("");

    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handelSubmit = async (e) => {
        e.preventDefault();

        setLoading("Creating your account...");
        setSuccess("");
        setError("");

        try {
            const user_data = new FormData();

            user_data.append("username", username);
            user_data.append("email", email);
            user_data.append("phone", phone);
            user_data.append("password", password);

            const response = await axios.post(
                "https://ynwsatia.alwaysdata.net/api/signup",
                user_data
            );

            console.log(response);

            if (response.status === 200) {
                setSuccess("✨ Account created successfully");
                setLoading("");

                updateUsername("");
                updateEmail("");
                updatePhone("");
                updatePassword("");
            }
        } catch (error) {
            console.log(error);

            setLoading("");

            setError("❌ Failed to create account");
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
            
        

            {/* BACKGROUND GLOW EFFECTS */}
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
                                marginTop: "30px",
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
                                    👤
                                </div>

                                <h1
                                    style={{
                                        color: "white",
                                        marginTop: "20px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Create Account
                                </h1>

                                <p
                                    style={{
                                        color: "#cbd5e1",
                                        fontSize: "15px",
                                    }}
                                >
                                    Join and start exploring your dashboard
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
                                {/* USERNAME */}
                                <div className="mb-4">
                                    <label
                                        style={{
                                            color: "white",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter username"
                                        required
                                        value={username}
                                        onChange={(e) =>
                                            updateUsername(e.target.value)
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
                                        className="form-control"
                                        placeholder="Enter email"
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

                                {/* PHONE */}
                                <div className="mb-4">
                                    <label
                                        style={{
                                            color: "white",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Enter phone number"
                                        required
                                        value={phone}
                                        onChange={(e) =>
                                            updatePhone(e.target.value)
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
                                        placeholder="Create password"
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
                                    🚀 Create Account
                                </button>

                                {/* SIGN IN LINK */}
                                <div className="text-center mt-4">
                                    <p style={{ color: "#cbd5e1" }}>
                                        Already have an account?
                                    </p>

                                    <Link
                                        to="/signin"
                                        style={{
                                            textDecoration: "none",
                                            color: "#60a5fa",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Sign In
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

export default Signup;