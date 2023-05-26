import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import MovieBar from "../components/MovieBar/MovieBar";

import axios from "axios";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLoginStore } from "../store/loginStore";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setIsLoggedIn = useLoginStore((state) => state.setIsLoggedIn);
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);

  const forgotPassword = async (event) => {
    event.preventDefault();
    alert("Functionality not added yet")
    //navigate("/lostPassword");
  };
/*   useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);
 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = btoa(`${email}:${password}`);
    try {
      const response = await axios.get(
        "http://localhost:8080/user",
       
        {
          headers: {
            'Authorization': `Basic ${credentials}`
          },
        }
      );

      const { authorization } = response.headers;
      if (authorization) {
        localStorage.setItem("token", authorization);
        setIsLoggedIn(true);
        console.log(authorization);
        console.log(response.data)
        navigate("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="email" className="label">
          Email:
        </label>
        <div className="control has-icons-left">
          <input
            className="input is-primary"
            type="text"
            value={email}
            placeholder="Enter Email"
            onChange={({ target }) => setEmail(target.value)}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faEnvelope} style={{color: "#0ee1be",}} />
          </span>
        </div>
      </div>

      <div className="field">
        <label htmlFor="password" className="label">
          Password:
        </label>
        <div className="control has-icons-left">
          <input
            className="input is-primary "
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={({ target }) => setPassword(target.value)}
          /><span className="icon is-small is-left">
          <FontAwesomeIcon icon={faLock}  style={{color: "#0ee1be",}}/>
        </span>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-primary" onSubmit={handleSubmit}>
            Login
          </button>
        </div>
        <div className="control">
          <button className="button is-secondary" onClick={forgotPassword}>
            Forgot Password
          </button>
        </div>
      </div>
    </form>
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
