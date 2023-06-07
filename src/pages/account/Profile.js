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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo125 from "../../logos/Logo_MovieDL_20230426_125x22.png";

export default function Profile(props) {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    // password: "",
    // verifyPassword: "",
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

  //   function findByUserName() {
  //     axios.get("http://localhost:8080/profile/" + userData.username).then((res) => {
  //       // const userData =jwt_decode(token);
  //       //console.log(userData);
  //       console.log(res.data)
  // //const userInfo = res.data
  // //console.log(userInfo)
  //       // setValues({
  //       //   email: userData.email,
  //       //   // pwd: userData.pwd,
  //       //   // verifyPwd: userData.verifyPwd,
  //       //   firstName: userData.firstName,
  //       //   lastName: userData.lastName,
  //       //   mobileNumber: userData.mobileNumber,
  //       //   streetAddress: userData.streetAddress,
  //       //   suite: userData.suite,
  //       //   city: userData.city,
  //       //   state: userData.state,
  //       //   zipCode: userData.zipCode,
  //       // });
  //     });
  //   }
  function validateEmail(email) {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  function validateMobileNumber(mobileNumber) {
    
    const mobileNumberRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm;
    return mobileNumberRegex.test(mobileNumber);
  };

  function validateZipCode(zipCode) {
    
    const zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
    return zipCodeRegex.test(zipCode);
  };

  const saveFormData = async (event) => {
    event.preventDefault()
    if (validateForm(true)) {
      handleClickOpen();
    }
    
  };
  const handleConfirmUpdate = async (event) => {
    event.preventDefault();
    //need an endpoint for updated submitted user data
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
        toast.success("Your profile was successfully updated!");
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
  };

  function cancelEdit() {
    setDisabled(true);
    setValues({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      mobileNumber: userData.mobileNumber,
      streetAddress: userData.streetAddress,
      suite: userData.suite,
      city: userData.city,
      state: userData.state,
      zipCode: userData.zipCode,
    });
  };
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

    if (
      !email ||
      !firstName ||
      !lastName ||
      !mobileNumber ||
      !streetAddress ||
      
      !city ||
      !state ||
      !zipCode
    ) {
      toast.error("Please fill in all fields.");
      return false;
    }

    
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!validateMobileNumber(mobileNumber)) {
      toast.error("Please enter a valid 10 digit mobile number.");
      return false;
    }
    if (!validateZipCode(zipCode)) {
      toast.error("Please enter a valid 5 digit ZIP code.");
      return false;
    }
    return true;
  };
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
          Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update your profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleConfirmUpdate} autoFocus>
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
                        </div>
                      </div>
                      {/* <div className="column is-half"></div>
                      <div className="columns">
                        <div className="column is-half">
                          <div className="field">
                            <label className="label">New Password</label>
                            <div className="control">
                              <input
                                name="pwd"
                                className="input"
                                type="password"
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
                                onChange={handleChange}
                                required
                                placeholder="********"
                              />
                            </div>
                          </div>
                        </div>
                      </div> */}
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
                            </div>
                          </div>
                        </div>

                        <div className="column is-one-quarter">
                          <div className="field">
                            <label className="label">State:</label>
                            <div className="control">
                              <input
                                className="input"
                                type="text"
                                value={values.state}
                                onChange={handleChange}
                                required
                                placeholder={userData.state}
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
                                name="zipCode"
                                placeholder={userData.zipCode}
                                title="Please enter your 5 digit zipcode"
                                
                                required
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
                        onClick={saveFormData}
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
      <ToastContainer />
    </div>
  );
}
