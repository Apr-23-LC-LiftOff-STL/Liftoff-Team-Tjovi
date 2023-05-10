import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    var value = e.target.value === "" ? null : e.target.value;

    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: JSON.stringify(values),
  credentials: 'include',
});

      if (response.status !== 200) {
        throw new Error(`Login failed: ${response.status}`);
      }

      alert("Login successful!");
      navigate("/");
    } catch (e) {
      alert(`Login failed: ${e.message}`);
    }
  };

  return (
    <div>
      <div>
        <h1 className="title">Log In</h1>
      </div>
      <form className="box" onSubmit={onSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="e.g. alex@example.com"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              placeholder="********"
            />
          </div>
        </div>

        <button type="submit" className="button is-primary">Sign in</button>
        <button className="button is-light">Forgot Password?</button>
      </form>
    </div>
  );
}