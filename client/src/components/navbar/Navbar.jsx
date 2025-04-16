import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout"); // Call the logout API
      dispatch({ type: "LOGOUT" }); // Clear user state
      navigate("/"); // Redirect to the home page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const loginform = () => {
    navigate("/login");
  };

  const registerform = () => {
    navigate("/register");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">RESERVE.Com</span>
        </Link>
        {user ? (
          <div className="navItems">
            <span className="username">Welcome, {user.username}</span>
            <button onClick={handleLogout} className="navButton">
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button onClick={registerform} className="navButton">
              Register
            </button>
            <button onClick={loginform} className="navButton">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;