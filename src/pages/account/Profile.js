import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import MovieBar from "../../components/MovieBar/MovieBar";

export default function Profile(props) {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
    verifyPassword: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    streetAddress: "",
    suite: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const userData = {};
  const [originalValues, setOriginalValues] = useState({ ...values });

  const [disabled, setDisabled] = useState(true);

  // useEffect(async () => {
  //    userData = await fetch("http://localhost:8080/register");
  //   setValues(data);
  // });

  function findByUserName() {
    axios.get("http://localhost:8080/user/" + userData.username).then((res) => {
      // const userData =jwt_decode(token);
      //console.log(userData);

      setValues({
        email: userData.email,
        // pwd: userData.pwd,
        // verifyPwd: userData.verifyPwd,
        firstName: userData.firstName,
        lastName: userData.lastName,
        mobileNumber: userData.mobileNumber,
        streetAddress: userData.streetAddress,
        suite: userData.suite,
        city: userData.city,
        state: userData.state,
        zipCode: userData.zipCode,
      });
    });
  }

  const saveFormData = async () => {
    //need an endpoint for updated submitted user data
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
    setOriginalValues((originalValues) => ({
      ...originalValues,
      [e.target.name]: value,
    }));
  };

  function enableEdit(e) {
    e.preventDefault();
    if (disabled) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function cancelEdit() {
    setDisabled(true);
    setValues({
      email: "",
      // pwd: "",
      // verifyPwd: "",
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
  }

  const onUpdate = async (event) => {
    event.preventDefault();

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
      const userData = jwtDecode(token);
      console.log(userData.username);
  
      setValues({
        email: userData.username,
        // pwd: userData.pwd,
        // verifyPwd: userData.verifyPwd,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.mobileNumber,
        streetAddress: userData.streetAddress,
        suite: userData.suite,
        city: userData.city,
        state: userData.state,
        zipCode: userData.zipCode,
      });
    }
  }, []);

  findByUserName();

  return (
    <div>
      <div>
        <div>
          <nav
            className="breadcrumb is-medium has-succeeds-separator pl-6 pt-1 pb-2"
            aria-label="breadcrumbs"
          >
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li className="is-active">
                <a href="/account/profile" aria-current="page">
                  My Profile
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="columns is-centered pt-4">
          <div className="column is-7 mx-6">
            <form
              className="box px-6 pb-6"
              style={{
                borderStyle: "solid",
                borderColor: "lightgray",
                borderWidth: "1px",
              }}
            >
              <div className="title is-3 mt-5 has-text-weight-semibold">
                My Profile
                <i>
                  <button
                    className={
                      disabled
                        ? "button is-small is-outlined is-pulled-right has-text-weight-bold"
                        : "button is-small is-warning is-pulled-right has-text-weight-bold"
                    }
                    onClick={enableEdit}
                  >
                    {disabled ? "Unlock Fields" : "Lock Fields"} &nbsp; &nbsp;
                    <span className="icon is-pulled-right">
                      <FontAwesomeIcon
                        icon={disabled ? faLock : faLockOpen}
                      />
                    </span>
                  </button>
                </i>
              </div>

              <div className="columns">
                <div className="column">
                  <div>
                    <fieldset disabled={disabled}>
                      <div className="field">
                        <label className="label">
                          E-Mail {originalValues.email}
                        </label>
                        <div className="control">
                          <input
                            className="input"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            required
                            placeholder={userData.user}
                            name="email"
                          />
                        </div>
                      </div>
                      <div className="column is-half"></div>
                      <div className="columns">
                        <div className="column is-half">
                          <div className="field">
                            <label className="label">New Password</label>
                            <div className="control">
                              <input
                                name="pwd"
                                className="input"
                                type="password"
                                value={values.pwd}
                                onChange={handleChange}
                                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                                required
                                placeholder="********"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="column is-half">
                          <div className="field">
                            <label className="label">Verify New Password</label>
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
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column is-half">
                          <div className="field">
                            <label className="label">
                              First Name: {originalValues.firstName}
                            </label>
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
                        </div>

                        <div className="column is-half">
                          <div className="field">
                            <label className="label">
                              Last Name {originalValues.lastName}
                            </label>
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
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column is-half">
                          <div className="field">
                            <label className="label">
                              Mobile Number {originalValues.mobileNumber}
                            </label>
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
                                title="Please enter your 10 digit phone number"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column is-half">
                          <div className="field">
                            <label className="label">
                              Street Address {originalValues.streetAddress}
                            </label>
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
                        </div>
                        <div className="column is-half">
                          <div className="field">
                            <label className="label">
                              Suite/Apt. Number {originalValues.suite}
                            </label>
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
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column is-half">
                          <div className="field">
                            <label className="label">
                              City {originalValues.city}
                            </label>
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
                        </div>

                        <div className="column is-one-quarter">
                          <div className="field">
                            <label className="label">
                              State: {originalValues.state}
                            </label>
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
                        </div>
                        <div className="column is-one-quarter">
                          <div className="field">
                            <label className="label">
                              Zip {originalValues.zipCode}
                            </label>
                            <div className="control">
                              <input
                                className="input"
                                type="text"   
                                pattern="[0-9]{5}"
                                value={values.zipCode}
                                onChange={handleChange}
                                name="zipCode"
                                title="Please enter your 5 digit zipcode"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <br />
                  <div className="field is-grouped">
                    <div className="control">
                      <button
                        className="button is-primary has-text-weight-semibold"
                        onClick={onUpdate}
                      >
                        Update Profile
                      </button>
                    </div>
                    <div className="control">
                      <button
                        type="button"
                        className="button is-secondary is-light"
                        onClick={cancelEdit}
                      >
                        Cancel Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <MovieBar />
    </div>
  );
}
