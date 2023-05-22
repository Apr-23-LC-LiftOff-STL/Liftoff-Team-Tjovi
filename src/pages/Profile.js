import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile(props) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
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

  var [disabled, setDisabled] = useState(true);
  // useEffect(async () => {
  //    userData = await fetch("http://localhost:8080/register");
  //   setValues(data);
  // });

  function findUserById() {
    var userData = fetch("http://localhost:8080/register");
    axios.get("http://localhost:8080/user/" + userData.id).then((res) => {
      const userData = res.data;
      console.log(userData);

      this.setValues({
        email: userData.email,
        password: userData.password,
        verifyPassword: userData.verifyPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        streetAddress: userData.streetAddress,
        suite: userData.suite,
        city: userData.city,
        state: userData.state,
        zipCode: userData.zipCode,
      });
    });
  }
  const saveFormData = async () => {
    const response = await fetch("http://localhost:8080/user", {
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

  function enableEdit() {
    setDisabled((disabled = false));
  }
  function cancelEdit() {
    setDisabled((disabled = true));
  }
  const onUpdate = async (event) => {
    event.preventDefault();

    //values.email should equal datapulled from database to makesure the user does not exist
    //seperate function and variable for said data?
    //if else statement needs to be put into a seperate function or ternary opererator to work

    try {
      await saveFormData();

      alert("Your profile was  successfully updated!");
    } catch (e) {
      alert(`Profile update failed! ${e.message}`);
      console.log("Failed");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please Login");
      navigate("/login");
    } else {
      findUserById();
      return (
        <div>
          <h1 className="title">Your Profile</h1>
          <button
            className="button is-primary is-outlined"
            onClick={enableEdit}
          >
            Edit Profile
          </button>
          <form className="box">
            <fieldset disabled={disabled}>
              <div className="field">
                <label className="label">Email:{values.email}</label>
                <div className="control">
                  <input
                    className="input is-primary"
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
                <label className="label">Password:</label>
                <div className="control">
                  <input
                    name="password"
                    className="input is-primary"
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
                <label className="label">Verify Password:</label>
                <div className="control">
                  <input
                    name="verifyPassword"
                    className="input is-primary"
                    type="password"
                    value={values.verifyPassword}
                    onChange={handleChange}
                    required
                    placeholder="********"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">First Name: {values.firstName}</label>
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
                <label className="label">Last Name: {values.lastName}</label>
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
                <label className="label">
                  Street Address: {values.streetAddress}
                </label>
                <div className="control">
                  <input
                    className="input is-primary"
                    type="text"
                    value={values.streetAddress}
                    onChange={handleChange}
                    required
                    name="streetAddress"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">
                  Suite/Apt. Number: {values.suite}
                </label>
                <div className="control">
                  <input
                    className="input is-primary"
                    type="text"
                    value={values.suite}
                    onChange={handleChange}
                    required
                    name="suite"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">City: {values.city}</label>
                <div className="control">
                  <input
                    className="input is-primary"
                    type="text"
                    value={values.city}
                    onChange={handleChange}
                    required
                    name="city"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">State: {values.state}</label>
                <div className="control">
                  <input
                    className="input is-primary"
                    type="text"
                    value={values.state}
                    onChange={handleChange}
                    required
                    name="state"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Zip Code: {values.zipCode}</label>
                <div className="control">
                  <input
                    className="input is-primary"
                    type="text"
                    value={values.zipCode}
                    onChange={handleChange}
                    name="zipCode"
                    placeholder="(optional)"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Telephone: {values.phoneNumber}</label>
                <div className="control">
                  <input
                    className="input is-primary"
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
            </fieldset>
          </form>
          <button className="button is-primary" onClick={onUpdate}>
            Update Profile
          </button>
          <button className="button is-light" onClick={cancelEdit}>
            Cancel Changes
          </button>
        </div>
      );
    }
  });
}
