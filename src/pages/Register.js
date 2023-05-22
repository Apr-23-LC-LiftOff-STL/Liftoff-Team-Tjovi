import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pwd: "",
    verifyPwd: "",
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
      Pwd: "",
      verifypwd: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
      streetAddress: "",
      suite: "",
      city: "",
      state: "",
      zipCode: "",
      role: "",
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
            <div className="control has-icons-left">
              <input
                className="input is-primary"
                type="email"
                value={values.email}
                onChange={handleChange}
                required
                placeholder="e.g. alex@example.com"
                name="email"
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faEnvelope} style={{color: "#0ee1be",}} />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left">
              <input
                name="pwd"
                className="input is-primary"
                type="password"
                value={values.pwd}
                onChange={handleChange}
                required
                placeholder="********"
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faLock} style={{color: "#0ee1be",}} />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Verify Password</label>
            <div className="control has-icons-left">
              <input
                name="verifyPwd"
                className="input is-primary"
                type="password"
                value={values.verifyPwd}
                onChange={handleChange}
                required
                placeholder="********"
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faLock} style={{color: "#0ee1be",}} />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input
                className="input is-primary"
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
                className="input is-primary"
                type="text"
                value={values.lastName}
                onChange={handleChange}
                required
                name="lastName"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Mobile Number</label>
            <div className="control has-icons-left">
              <input
                className="input is-primary"
                type="tel"
                name="mobileNumber"
                value={values.mobileNumber}
                onChange={handleChange}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
                placeholder="555-555-5555"
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faPhone}  style={{color: "#0ee1be",}}/>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Street Address</label>
            <div className="control has-icons-left">
              <input
                className="input is-primary"
                type="text"
                value={values.streetAddress}
                onChange={handleChange}
                required
                name="streetAddress"
              />
              <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faAddressBook} style={{color: "#0ee1be",}} />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Suite/Apt. Number</label>
            <div className="control has-icons-left">
              <input
                className="input is-primary"
                type="text"
                value={values.suite}
                onChange={handleChange}
                name="suite"
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faAddressBook} style={{color: "#0ee1be",}} />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">City</label>
            <div className="control has-icons-left">
              <input
                className="input is-primary"
                type="text"
                value={values.city}
                onChange={handleChange}
                required
                name="city"
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faAddressBook} style={{color: "#0ee1be",}} />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">State</label>
            <div className="control has-icons-left">
              <input
                className="input is-primary"
                type="text"
                value={values.state}
                onChange={handleChange}
                required
                name="state"
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faAddressBook}  style={{color: "#0ee1be",}}/>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Zip Code</label>
            <div className="control has-icons-left">
              <input
                className="input is-primary"
                type="text"
                value={values.zipCode}
                onChange={handleChange}
                name="zipCode"
                placeholder="(optional)"
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faAddressBook} style={{color: "#0ee1be",}} />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Role</label>
            <div className="control">
              <input
                className="input is-primary"
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
