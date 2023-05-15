import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    role: "",
    verifyPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    streetAddress: "",
    suite: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const saveFormData = async () => {
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
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
    
    if (customer) {
      
    return (
      <div>
        <head>
          <h1 className="title"> My Account</h1>
        </head>
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
              <label className="label">First Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={values.firstName}
                  onChange={handleChange}
                  required
                  name="firstName"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Last Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  required
                  name="lastName"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Street Address</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={values.streetAddress}
                  onChange={handleChange}
                  required
                  name="streetAddress"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Suite/Apt. Number</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={values.suite}
                  onChange={handleChange}
                  required
                  name="suite"
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
              <label className="label">Zip Code</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={values.zipCode}
                  onChange={handleChange}
                  name="zipCode"
                  placeholder="(optional)"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Telephone</label>
              <div className="control">
                <input
                  className="input"
                  type="tel"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  required
                  placeholder="555-555-5555"
                />
              </div>
            </div>
            
          </form>
          <button className="button is-primary">Update Profile</button>
          <button className="button is-light">Cancel Changes</button>
        </div>
        
      </div>
    );
  };
//   return(
// //alert("Please log in");
// <p>
//   <a href="http://localhost:3000/account/profile">Login Here!</a>
//   </p>
  
//   );
// };
 }
