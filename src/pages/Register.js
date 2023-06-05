import { useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faSignature } from "@fortawesome/free-solid-svg-icons";
import Alert from '@mui/material/Alert';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import MovieBar from "../components/MovieBar/MovieBar";
import logo125 from "../components/Logo_MovieDL_20230426_125x22.png";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pwd: "",
    verifyPwd: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    streetAddress: "",
    suite: "",
    city: "",
    state: "",
    zipCode: "",
    role: "user",
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
      verifyPwd: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
      streetAddress: "",
      suite: "",
      city: "",
      state: "",
      zipCode: "",
    });
    navigate("/");
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelRegistration = () => {
    setOpen(false);
    navigate("/");
  };

  return (
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
            <a href="#" aria-current="page">
              Register
            </a>
          </li>
        </ul>
      </nav>
     
      <div className="columns is-centered">
        <div className="column is-7 mx-6">
          <form
            className="box px-6 pb-6"
            style={{
              borderStyle: "solid",
              borderColor: "lightgray",
              borderWidth: "1px",
            }}
            onSubmit={onSubmit}
          >
            <div className="title is-3 mt-5 has-text-weight-semibold">
              Register
            </div>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label">E-mail</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. alex@example.com"
                      name="email"
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left">
                    <input
                      name="pwd"
                      className="input"
                      type="password"
                      value={values.pwd}
                      onChange={handleChange}
                      required
                      placeholder="********"
                      //title="Password must contain: Minimum 8 characters atleast 1 Alphabet and 1 Number"
                      //pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="column is-half">
                <div className="field">
                  <label className="label">Verify Password</label>
                  <div className="control has-icons-left">
                    <input
                      name="verifyPwd"
                      className="input"
                      type="password"
                      value={values.verifyPwd}
                      onChange={handleChange}
                      required
                      placeholder="********"
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-half">
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
              </div>
              <div className="column is-half">
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
            </div>
            <div className="columns">
              <div className="column is-half">
                <label className="label">Mobile Number</label>
                <div className="control has-icons-left">
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
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <label className="label">Street Address</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      value={values.streetAddress}
                      onChange={handleChange}
                      required
                      name="streetAddress"
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faAddressBook} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="column is-half">
                <div className="field">
                  <label className="label">Suite/Apt. Number</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={values.suite}
                      onChange={handleChange}
                      name="suite"
                      placeholder="(optional)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-half">
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
              </div>
              <div className="column is-one-quarter">
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
              </div>
              <div className="column is-one-quarter">
                <div className="field">
                  <label className="label">Zip</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      pattern="[0-9]{5}"
                      value={values.zipCode}
                      onChange={handleChange}
                      title="Please enter your 5 digit zipcode"
                      required
                      name="zipCode"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button
                  type="submit"
                  className="button is-primary has-text-weight-semibold"
                >
                  Register
                </button>
                
              </div>
              <div className="control">
                <button
                  type="button"
                  className="button is-secondary is-light"
                  onClick={handleOpen}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <img src={logo125} width="112" height="28" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <span className="has-text-weight-semibold">
                Cancel registration?
              </span>{" "}
              All fields will be cleared.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              className="button is-small is-warning has-text-weight-semibold"
              onClick={handleCancelRegistration}
            >
              Yes
            </button>
            <button
              className="button is-small is-primary is-primary has-text-weight-semibold"
              onClick={handleClose}
              autoFocus
            >
              No
            </button>
          </DialogActions>
        </Dialog>
      </div>
      <MovieBar />
    </div>
  );
}
