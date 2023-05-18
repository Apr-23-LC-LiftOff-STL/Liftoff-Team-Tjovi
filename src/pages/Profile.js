import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Profile() {
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

  const userInfo = "";

  var [disabled, setDisabled] = useState(true);
  // useEffect(async () => {
  //   let data = await fetch("http://localhost:8080/register");
  //   setValues(data);
  // });

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

  function verifyEmail() {
    if (values.email == userInfo.email) {
      alert("This user already exists");
    } else {
      return;
    }
  }

  function enableEdit() {
    setDisabled((disabled = false));
  }
  function cancelEdit() {
    setDisabled((disabled = true));
  }
  const onUpdate = async (event) => {
    console.log("you are here");

    event.preventDefault();
    
    //values.email should equal datapulled from database to makesure the user does not exist
    //seperate function and variable for said data?
    //if else statement needs to be put into a seperate function or ternary opererator to work

    try {
      await saveFormData();
      verifyEmail();
      alert("Your profile was  successfully updated!");
    } catch (e) {
      alert(`Profile update failed! ${e.message}`);
      console.log("Failed");
    }
  };

  //if (customer) {

  return (
    <div>
      <h1>Stuff</h1>
      <h1>Stuff</h1>
      <h1 className="title">Your Profile</h1>
      <button className="button is-primary is-outlined" onClick={enableEdit}>
        Edit Profile
      </button>
      <form className="box">
        <fieldset disabled={disabled}>
          <div className="field">
            <label className="label">{values.email}</label>
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
            <label className="label">Password</label>
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
            <label className="label">Verify Password</label>
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
            <label className="label">Street Address</label>
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
            <label className="label">Suite/Apt. Number</label>
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
            <label className="label">City</label>
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
            <label className="label">State</label>
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
            <label className="label">Zip Code</label>
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
            <label className="label">Telephone</label>
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
//   return(
// //alert("Please log in");
// <p>
//   <a href="http://localhost:3000/account/profile">Login Here!</a>
//   </p>

//   );
// };
// }
