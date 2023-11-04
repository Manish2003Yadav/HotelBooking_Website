import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./register.css";

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        password: undefined,
        country: undefined,
        city: undefined,
        phone: undefined,
    });

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3001/api/auth/register", credentials);
            dispatch({ payload: res.data.details });
            navigate("/login")
        } catch (err) {
            dispatch({ payload: err.response.data });
        }
    };

    return (
        <div className="register">
            <div className="rContainer">
                <input
                    type="text"
                    placeholder="USERNAME"
                    id="username"
                    onChange={handleChange}
                    className="rInput"
                />
                <input
                    type="password"
                    placeholder="PASSWORD"
                    id="password"
                    onChange={handleChange}
                    className="rInput"
                />
                <input
                    type="email"
                    placeholder="EMAIL"
                    id="email"
                    onChange={handleChange}
                    className="rInput"
                />
                <input
                    type="text"
                    placeholder="COUNTRY"
                    id="country"
                    onChange={handleChange}
                    className="rInput"
                />
                <input
                    type="text"
                    placeholder="CITY"
                    id="city"
                    onChange={handleChange}
                    className="rInput"
                />
                <input
                    type="phone"
                    placeholder="PHONE"
                    id="phone"
                    onChange={handleChange}
                    className="rInput"
                />
                <button onClick={handleClick} className="lButton">
                    Submit
                </button>


            </div>
        </div>
    );
};

export default Register;