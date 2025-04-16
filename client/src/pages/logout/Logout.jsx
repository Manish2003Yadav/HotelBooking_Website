import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./logout.css";

const Logout = () => {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController(); // For cleanup
        const logout = async () => {
            try {
                await axios.post("/auth/logout", {}, { signal: controller.signal });
                dispatch({ type: "LOGOUT" });
                navigate("/"); // Redirect to the home page
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("Logout request canceled");
                } else {
                    console.error("Logout failed:", err);
                    setError("Logout failed. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };

        logout();

        return () => {
            controller.abort(); // Cleanup on component unmount
        };
    }, [dispatch, navigate]);

    return (
        <div className="logout">
            {loading ? (
                <p>Logging out...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <p>Redirecting...</p>
            )}
        </div>
    );
};

export default Logout;