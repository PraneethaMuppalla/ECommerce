import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Your Firebase API Key
    const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBx3QzAEXrdkq9rpj4yv7Yv-8A-1ozA9LQ`;

    try {
      const response = await axios.post(loginUrl, {
        email,
        password,
        returnSecureToken: true,
      });

      // console.log(response.data); // Successful login response
      localStorage.setItem("adminToken", response.data.idToken);
      dispatch(login());
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      setError(error.response.data.error.message);
    }
  };

  return (
    <div className="main-content">
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
