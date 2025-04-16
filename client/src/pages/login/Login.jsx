import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      alert("Please fill in both username and password.");
      return;
    }
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || "Login failed" });
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        {!user ? (
          <>
            <input
              type="text"
              placeholder="USERNAME"
              id="username"
              onChange={handleChange}
              className="lInput"
              value={credentials.username}
            />
            <input
              type="password"
              placeholder="PASSWORD"
              id="password"
              onChange={handleChange}
              className="lInput"
              value={credentials.password}
            />
            <button disabled={loading} onClick={handleClick} className="lButton">
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <span>{error.message || "Something went wrong. Please try again."}</span>}
          </>
        ) : (
          <button onClick={handleLogout} className="lButton">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;