import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pwd: "",
    role: "",
    verifyPwd: "",
    name: "",
    mobileNumber: "",
  });

  const saveFormData = async () => {
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.status !== 201) {
      throw new Error(`Request failed: ${response.status}`);
    }
  };

  const handleChange = (e) => {
    var value = e.target.value === "" ? null : e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (values.pwd !== values.verifyPwd) {
      alert("Passwords do NOT match!");
    } else {
      try {
        await saveFormData();
        alert("Your registration was successfully submitted!");
        navigate("/");
      } catch (e) {
        alert(`Registration failed! ${e.message}`);
      }
    }
  };

  const cancelRegistration = () => {
    setValues({
      email: "",
      pwd: "",
      role: "",
      verifyPwd: "",
      name: "",
      mobileNumber: "",
    });
    navigate("/");
  };

  return (
    <div>
      <h1 className="title">Register</h1>
      <div>
        <form className="box" onSubmit={onSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                value={values.email}
                onChange={handleChange}
                required
                placeholder="e.g. alex@example.com"
                name="email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                name="pwd"
                className="input"
                type="password"
                value={values.pwd}
                onChange={handleChange}
                required
                placeholder="********"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Verify Password</label>
            <div className="control">
              <input
                name="verifyPwd"
                className="input"
                type="password"
                value={values.verifyPwd}
                onChange={handleChange}
                required
                placeholder="********"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={values.name}
                onChange={handleChange}
                required
                name="name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Mobile Number</label>
            <div className="control">
              <input
                className="input"
                type="tel"
                name="mobileNumber"
                value={values.mobileNumber}
                onChange={handleChange}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
                placeholder="555-555-5555"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Role</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={values.role}
                onChange={handleChange}
                required
                name="role"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary">
                Register
              </button>
              <button 
                type="button" 
                className="button is-light" 
                onClick={cancelRegistration}
              >
                Cancel Registration
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


