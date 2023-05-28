import { useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

import MovieBar from "../components/MovieBar/MovieBar";

import axios from "axios";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useCartStore } from "../store/cartStore";
import { useLoginStore } from "../store/loginStore";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [randomQuote, setRandomQuote] = useState("");
  const [randomMovie, setRandomMovie] = useState("");

  const setIsLoggedIn = useLoginStore((state) => state.setIsLoggedIn);
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const setCartUser = useCartStore((state) => state.setCartUser);

  const forgotPassword = async (event) => {
    event.preventDefault();
    alert("Lost password feature under construction. Please contact your network administrator.");
    //navigate("/lostPassword");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = btoa(`${email}:${password}`);
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
        console.log(authorization);
        console.log(response.data);
        const userData = jwtDecode(authorization);
        setCartUser(userData.username);
        navigate("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      alert(`Login failed: ${error.message}`);
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
          <MovieBar />
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
            <div className="title is-3 mt-5 has-text-weight-semibold">Log In</div>
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
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
            </div>

            <div className="field is-grouped mt-5">
              <div className="control">
                <NavLink className="button is-primary has-text-weight-semibold" onSubmit={handleSubmit}>
                  Log In
                </NavLink>
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
      <MovieBar />
    </div>
  );
};
export default Login;

//     return (
//       <div >
//         <div className="field is-small">
//           <p className="control is-horizontal has-icons-left has-icons-right">
//             <input className="input "
//             type="email"
//             value={values.email}
//             onChange={handleChange}
//             required
//              placeholder="Email"
//              name="email"/>
//             <span className="icon is-small is-left">
//               <i className="fas fa-envelope"></i>
//             </span>
//             <span className="icon is-small is-right">
//               <i className="fas fa-check"></i>
//             </span>
//           </p>
//         </div>
//         <div className="field">
//           <p className="control is-horizontal has-icons-left">
//             <input className="input"
//             type="password"
//             value={values.password}
//                 onChange={handleChange}
//                 // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
//                 title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
//             placeholder="Password"
//             name="password"/>
//             <span className="icon is-small is-left">
//               <i className="fas fa-lock"></i>
//             </span>
//           </p>
//         </div>
//         <div className="field">
//           <p className="control">
//             <button className="button is-primary" onClick={onSubmit}>Login</button>
//              <button className="button is-secondary" onClick={forgotPassword}>Forgot Password</button>
//           </p>
//         </div>
//       </div>
//     );
//   };
//  }
