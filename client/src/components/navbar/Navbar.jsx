import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const loginform = () => {
    if (user) {
      navigate("/");
    }
    else {
      navigate("/login");
    }
  };

  const registerform = () => {
    if (user) {
      navigate("/");
    }
    else {
      navigate("/register");
    }

  };



  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">RESERVE.Com</span>
        </Link>
        {user ? user.username : (
          <div className="navItems">
            <button onClick={registerform} className="navButton">Register</button>
            <button onClick={loginform} className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
