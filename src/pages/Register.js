import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    verifyPassword: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    tel: "",
  });

 
  const saveFormData = async () => {
    const response = await fetch("/api/registration", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (response.status !== 200) {
      
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
    console.log("you are here");
   
    event.preventDefault();
    if (values.password !== values.verifyPassword) {
      alert("Passwords do NOT match!");
    } else {
      try {
         await saveFormData();
        alert("Your registration was  successfully submitted!");
        alert("passwords matched");
        
        console.log("values")
      console.log(values)
        navigate("/");
      } catch (e) {
        alert(`Registration failed! ${e.message}`);
        console.log("Failed");
      }
    }
  };
  return (
    <div>
      <h1 className="title">Register</h1>
      <div>
        <form className="box">
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
                name="password"
                className="input"
                type="password"
                value={values.password}
                onChange={handleChange}
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
                placeholder="********"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Verify Password</label>
            <div className="control">
              <input
                name="verifyPassword"
                className="input"
                type="password"
                value={values.verifyPassword}
                onChange={handleChange}
                required
                placeholder="********"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Street Address</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={values.address1}
                onChange={handleChange}
                required
                name="address1"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Suite or Floor No.</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={values.address2}
                onChange={handleChange}
                name="address2"
                placeholder="(optional)"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">City</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={values.city}
                onChange={handleChange}
                required
                name="city"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">State</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={values.state}
                onChange={handleChange}
                required
                name="state"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Telephone</label>
            <div className="control">
              <input
                className="input"
                type="tel"
                name="tel"
                value={values.tel}
                onChange={handleChange}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
                placeholder="555-555-5555"
              />
            </div>
          </div>

          <button className="button is-primary" onClick={onSubmit}>
            Register
          </button>
          <button className="button is-light">Cancel Registration</button>
        </form>
      </div>
    </div>
  );
}
