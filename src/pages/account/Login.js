import { useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import underConstruction from "./under-construction90s-90s.gif";

import axios from "axios";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCartStore } from "../../store/cartStore";
import { useLoginStore } from "../../store/loginStore";

import logo125 from "../../logos/Logo_MovieDL_20230426_125x22.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const setIsLoggedIn = useLoginStore((state) => state.setIsLoggedIn);
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const setCartUser = useCartStore((state) => state.setCartUser);
  const getAndMergeCart = useCartStore((state) => state.getAndMergeCart);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const forgotPassword = () => {
    setOpen(true);
    //navigate("/lostPassword");
  };

  const handleClose = () => {
    setOpen(false);
  };
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function validateForm() {
    let newErrors = {};
    if (!email || !validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8 && email != "happy@example.com") {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = btoa(`${email}:${password}`);
    const isValid = validateForm();
    let userExists = false;
    if (isValid) {
      const userCheck = await axios.get(
        `http://localhost:8080/profile/isUser/${email}`
      );
      if (userCheck.status === 200 || userCheck.status === 201) {
        userExists = true;
      } else if (userCheck.status === 204) {
        toast.error("This user does not exist");
      }

      if (userExists) {
        try {
          const response = await axios.get(
            "http://localhost:8080/user",

            {
              headers: {
                Authorization: `Basic ${credentials}`,
              },
            }
          );

          const { authorization } = response.headers;
          if (authorization) {
            localStorage.setItem("token", authorization);
            setIsLoggedIn(true);

            const userData = jwtDecode(authorization);
            setCartUser(userData.username);
            getAndMergeCart(userData.username);
            navigate("/");
          } else {
            throw new Error("Login failed");
          }
        } catch (error) {
          toast.error(`Login failed: email or password is incorrect`);
        }
      }
    }
  };

  const token = localStorage.getItem("token");

  if (token) {
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
                Log In
              </a>
            </li>
          </ul>
        </nav>
        <div className="section">
          <div className="title is-4 ml-6">You are currently logged in.</div>
          <div className="ml-6 is-italic">
            If you would like to log in as a different user, please log out
            first.
          </div>
          <br />
          <NavLink className="button is-small is-link is-outlined ml-6" to="/">
            <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Browse Movies
          </NavLink>
        </div>
      </div>
    );
  }

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
              Log In
            </a>
          </li>
        </ul>
      </nav>
      <div className="columns is-centered">
        <div className="column is-5 mx-6">
          <form
            className="box px-6 pb-6"
            style={{
              borderStyle: "solid",
              borderColor: "lightgray",
              borderWidth: "1px",
            }}
            onSubmit={handleSubmit}
          >
            <div className="title is-3 mt-5 has-text-weight-semibold">
              Log In
            </div>
            <div className="field">
              <label htmlFor="email" className="label">
                E-mail
              </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  value={email}
                  placeholder="E-mail"
                  onChange={({ target }) => setEmail(target.value)}
                />
                {errors.email && (
                  <p className="help is-danger">{errors.email}</p>
                )}
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
            </div>

            <div className="field">
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  value={password}
                  placeholder="*********"
                  onChange={({ target }) => setPassword(target.value)}
                />
                {errors.password && (
                  <p className="help is-danger">{errors.password}</p>
                )}
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
            </div>

            <div className="field is-grouped mt-5">
              <div className="control">
                <button
                  className="button is-primary has-text-weight-semibold"
                  onSubmit={handleSubmit}
                >
                  Log In
                </button>
              </div>
              <div className="control">
                <NavLink className="button is-secondary is-link" to="/register">
                  Register
                </NavLink>
              </div>
            </div>
          </form>
          <div className="has-text-right pr-5">
            <NavLink
              className="has-text-link is-italic is-size-6"
              onClick={forgotPassword}
            >
              Lost Password?
            </NavLink>
          </div>
        </div>
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
            Lost password feature under construction. Please contact your
            network administrator.
            <br></br>
            <p className="has-text-centered"><img src={underConstruction} style={{maxWidth: '150px'}}/></p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="button is-primary is-primary m-2"
            onClick={handleClose}
            autoFocus
          >
            Close
          </button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};
export default Login;
