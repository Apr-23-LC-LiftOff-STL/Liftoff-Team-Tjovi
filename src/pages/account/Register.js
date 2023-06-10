import { useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import logo125 from "../../logos/Logo_MovieDL_20230426_125x22.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [errors, setErrors] = useState({});
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

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateMobileNumber(mobileNumber) {
    const mobileNumberRegex =
      /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm;
    return mobileNumberRegex.test(mobileNumber);
  }

  function validateZipCode(zipCode) {
    const zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
    return zipCodeRegex.test(zipCode);
  }
const userExistCheck = async () => {
    const username = values.email
    let userExists = false
  const response = await axios.get(
            `http://localhost:8080/profile/isUser/${username}`
            
          );
          if (response.status === 200 || response.status === 201) {
           toast.error("This email is already in use!")
           return userExists = true
          }else{
          return
           }
          }
  function validateForm() {
    const {
      email,
      firstName,
      lastName,
      pwd,
      verifyPwd,
      mobileNumber,
      streetAddress,
      city,
      state,
      zipCode,
    } = values;

    let newErrors = {};
    if (!email || !validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!pwd) {
      newErrors.pwd = "Password is required";
    } else if (pwd.length < 8) {
      newErrors.pwd = "Password must be at least 8 characters long";
    } else if (!/(?=.*[A-Z])/.test(values.pwd)) {
      newErrors.pwd = "Password must contain at least 1 capital letter";
    } else if (!/(?=.*\d)/.test(values.pwd)) {
      newErrors.pwd = "Password must contain at least 1 number";
    }
    if (!verifyPwd) {
      newErrors.verifyPwd = "Password verification is required";
    } else if (verifyPwd !== pwd) {
      newErrors.verifyPwd = "Passwords MUST match";
    }

    if (!firstName || firstName.length < 2 || firstName.length > 50) {
      newErrors.firstName = "First name must be between 2 and 50 characters.";
    }

    if (!lastName || lastName.length < 2 || lastName.length > 50) {
      newErrors.lastName = "Last name must be between 2 and 50 characters.";
    }

    if (!mobileNumber || !validateMobileNumber(mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10 digit mobile number.";
    }

    if (!streetAddress) {
      newErrors.streetAddress = "Please enter the street address.";
    }

    if (!city) {
      newErrors.city = "Please enter the city.";
    }

    if (!state) {
      newErrors.state = "Please select the state.";
    }

    if (!zipCode || !validateZipCode(zipCode)) {
      newErrors.zipCode = "Please enter a valid 5 digit ZIP code.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const saveFormData = async () => {
    try {
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
    } catch (error) {
      console.error(error);
      toast.error("Registration failed! Please try again.");
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
    const isValid = validateForm();
    const username = values.email
    let userExists = false
    if (!isValid) {return
     
    }
   try {
        const response = await axios.get(
          `http://localhost:8080/profile/isUser/${username}`
        );
  
        if (response.status === 200 || response.status === 201) {
          toast.error("This email is already in use!");
          userExists = true;
        }
      } catch (error) {
        toast.error(`Failed to check user existence! ${error.message}`);
      }
    if (!userExists && isValid) {
      try {
        await saveFormData();
        toast.success("Registration successfully submitted",{autoClose: 2000});
        setTimeout(() => navigate("/"), 3000);
      } catch (error) {
        toast.error(`Registration failed! ${error.message}`);
      }
    }
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
                      placeholder="e.g. alex@example.com"
                      name="email"
                    />
                    {errors.email && (
                      <p className="help is-danger">{errors.email}</p>
                    )}
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
                      placeholder="********"
                     
                    />
                    {errors.pwd && (
                      <p className="help is-danger">{errors.pwd}</p>
                    )}
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
                      placeholder="********"
                    />
                    {errors.verifyPwd && (
                      <p className="help is-danger">{errors.verifyPwd}</p>
                    )}
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
                      className={`input ${errors.firstName && "is-danger"}`}
                      type="text"
                      value={values.firstName}
                      onChange={handleChange}
                      name="firstName"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="help is-danger">{errors.firstName}</p>
                  )}
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
                    name="lastName"
                  />
                  {errors.lastName && (
                    <p className="help is-danger">{errors.lastName}</p>
                  )}
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
                    

                    placeholder="555-555-5555"
                    title="Please enter your 10 digit phone number"
                  />
                  {errors.mobileNumber && (
                    <p className="help is-danger">{errors.mobileNumber}</p>
                  )}
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
                      name="streetAddress"
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faAddressBook} />
                    </span>
                    {errors.streetAddress && (
                      <p className="help is-danger">{errors.streetAddress}</p>
                    )}
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
                      name="city"
                    />
                    {errors.city && (
                      <p className="help is-danger">{errors.city}</p>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="column is-one-quarter">
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
              </div> */}
              <div className="column is-one-quarter">
                <label className="label">State</label>
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select name="state" required onChange={handleChange}>
                        <option selected="default">---</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arksansas</option>
                        <option value="AS">American Samoa</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="GU">Guam</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="MP">Northern Mariana Islands</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="TT">Trust Territories</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="VI">Virgin Islands</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
                      {errors.state && (
                        <p className="help is-danger">{errors.state}</p>
                      )}
                    </div>
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
                      //pattern="[0-9]{5}"
                      value={values.zipCode}
                      onChange={handleChange}
                      title="Please enter your 5 digit zipcode"
                      name="zipCode"
                    />
                    {errors.zipCode && (
                      <p className="help is-danger">{errors.zipCode}</p>
                    )}
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
            <img className="mt-4" src={logo125} width="112" height="28" />
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
              className="button is-warning"
              onClick={handleCancelRegistration}
            >
              Yes
            </button>
            <button
              className="button is-primary m-2"
              onClick={handleClose}
              autoFocus
            >
              No
            </button>
          </DialogActions>
        </Dialog>
      </div>
      <ToastContainer />
    </div>
  );
}
