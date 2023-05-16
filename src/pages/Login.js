import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        value={email}
        placeholder="Enter Email"
        onChange={({ target }) => setEmail(target.value)}
      />
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          placeholder="Enter Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
