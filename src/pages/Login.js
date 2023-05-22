import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const forgotPassword = async (event) => {
    event.preventDefault();
    navigate("/lostPassword");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        value={email}
        placeholder="Enter Email"
        onChange={({ target }) => setEmail(target.value)}
      />
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          placeholder="Enter Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
      <button className="button is-secondary" onClick={forgotPassword}>
        Forgot Password
      </button>
    </form>
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
