import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/signin");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">

            <Link className="navbar-brand fw-bold" to="/">
                🛍️ Satia Electronics
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navMenu"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navMenu">

                <ul className="navbar-nav ms-auto align-items-center gap-2">

                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>

                    {/* NEW LINKS */}

                    <li className="nav-item">
                        
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/checkout">
                            Checkout
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/adminstock">
                            Admin Stock
                        </Link>
                    </li>

                    {!user && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin">
                                    Sign In
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    )}

                    {user && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/addproduct">
                                    Add Product
                                </Link>
                            </li>

                            <li className="nav-item text-white px-2">
                                👋 {user.username}
                            </li>

                            <li className="nav-item">
                                <button
                                    onClick={logout}
                                    className="btn btn-danger btn-sm"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}

                </ul>

            </div>
        </nav>
    );
};

export default Navbar;