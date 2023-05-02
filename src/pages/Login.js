import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', {
        username: username,
        password: password,
      });

      // Handle successful login
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="title">Log In</h1>
      </div>
      <form className="box" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="button is-primary">
          Sign in
        </button>
        <button className="button is-light">Forgot Password?</button>
      </form>
    </div>
  );
}

