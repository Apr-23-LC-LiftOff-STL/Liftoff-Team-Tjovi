import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";
import jwtDecode from "jwt-decode";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo125 from "../../logos/Logo_MovieDL_20230426_125x22.png";

export default function Profile(props) {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
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
  const [errors, setErrors] = useState({});
  const [originalValues, setOriginalValues] = useState({ ...values });
  const [disabled, setDisabled] = useState(true);

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

  const saveFormData = async (event) => {
    event.preventDefault();
    if (validateForm(true)) {
      handleClickOpen();
    }
  };

  const handleConfirmUpdate = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const userData = jwtDecode(token);
    const username = userData.username;
    try {
      const response = await axios.put(
        `http://localhost:8080/profile/edit/${username}`,
        values
      );
      if (response.status === 200 || response.status === 201) {
        setDisabled(true);
        handleClose();
        toast.success("Your profile was successfully updated!",{autoClose: 2000});
        setTimeout(() => navigate("/"), 3000);
      } else {
        throw new Error(`Request failed: ${response.status}`);
      }
    } catch (error) {
      handleClose();
      toast.error("Profile update failed!");
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
  // function cancelEdit() {
  //  setValues({ ...originalValues });
  //   setDisabled(true);
  //   setErrors({});
  //   console.log("These are the Original values")
  //   console.log({...originalValues})
  //   console.log("These are the values")
  //   console.log({...values})
  // };
  function validateForm() {
    const {
      email,
      firstName,
      lastName,
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
      newErrors.state = "Please enter the state.";
    }
    if (!zipCode || !validateZipCode(zipCode)) {
      newErrors.zipCode = "Please enter a valid 5 digit ZIP code.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    } else {
      const userData = jwtDecode(token);
      const username = userData.username;

      axios.get(`http://localhost:8080/profile/${username}`).then((res) => {
        const userInfo = res.data;
        console.log(userInfo);
        setValues({
          email: userInfo.email,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          mobileNumber: userInfo.mobileNumber,
          streetAddress: userInfo.streetAddress,
          suite: userInfo.suite,
          city: userInfo.city,
          state: userInfo.state,
          zipCode: userInfo.zipCode,
        });
        setOriginalValues({
          email: userInfo.email,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          mobileNumber: userInfo.mobileNumber,
          streetAddress: userInfo.streetAddress,
          suite: userInfo.suite,
          city: userInfo.city,
          state: userInfo.state,
          zipCode: userInfo.zipCode,
        });
      });
    }
  }, []);

  return (
    <div>
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
          <DialogContentText>
            Are you sure you want to <span className="has-text-weight-semibold">update your profile?</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="m-2">
          <button className="button is-warning" onClick={handleClose}>Cancel</button>
          <button className="button is-primary" onClick={handleConfirmUpdate} autoFocus>
            Update
          </button>
        </DialogActions>
      </Dialog>
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
              <li>
                <a href="orders">Order History</a>
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
                      <FontAwesomeIcon icon={disabled ? faLock : faLockOpen} />
                    </span>
                  </button>
                </i>
              </div>

              <div className="columns">
                <div className="column">
                  <div>
                    <fieldset disabled={disabled}>
                      <div className="field">
                        <label className="label">E-Mail</label>
                        <div className="control">
                          <input
                            className="input"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            required
                            placeholder={userData.email}
                            name="email"
                          />
                          {errors.email && (
                            <p className="help is-danger">{errors.email}</p>
                          )}
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
                                placeholder={userData.firstName}
                              />
                              {errors.firstName && (
                                <p className="help is-danger">
                                  {errors.firstName}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="column is-half">
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
                                placeholder={userData.lastName}
                              />
                              {errors.lastName && (
                                <p className="help is-danger">
                                  {errors.lastName}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column is-half">
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
                                placeholder={userData.mobileNumber}
                                title="Please enter your 10 digit phone number in this format '555-555-5555'"
                              />
                              {errors.mobileNumber && (
                                <p className="help is-danger">
                                  {errors.mobileNumber}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column is-half">
                          <div className="field">
                            <label className="label">Street Address</label>
                            <div className="control">
                              <input
                                className="input"
                                type="text"
                                value={values.streetAddress}
                                onChange={handleChange}
                                required
                                placeholder={userData.streetAddress}
                                name="streetAddress"
                              />
                              {errors.streetAddress && (
                                <p className="help is-danger">
                                  {errors.streetAddress}
                                </p>
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
                                placeholder={userData.suite}
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
                                placeholder={userData.city}
                              />
                              {errors.city && (
                                <p className="help is-danger">{errors.city}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="column is-one-quarter">
                          <label className="label">State</label>
                          <div class="field has-addons">
                            <div className="control is-expanded">
                              <div className="select is-fullwidth">
                                <select
                                  name="state"
                                  required
                                  onChange={handleChange}
                                  value={userData.state}
                                >
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
                                  <option value="DC">
                                    District of Columbia
                                  </option>
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
                                  <option value="MP">
                                    Northern Mariana Islands
                                  </option>
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
                                pattern="[0-9]{5}"
                                value={values.zipCode}
                                onChange={handleChange}
                                name="zipCode"
                                placeholder={userData.zipCode}
                                title="Please enter your 5 digit zipcode"
                                required
                              />
                              {errors.zipCode && (
                                <p className="help is-danger">
                                  {errors.zipCode}
                                </p>
                              )}
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
                        onClick={saveFormData}
                      >
                        Update Profile
                      </button>
                    </div>
                    <div className="control"></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
