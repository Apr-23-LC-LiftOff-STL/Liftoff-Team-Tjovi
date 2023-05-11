import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"

// export default function Login() {
//   const navigate = useNavigate();
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });



  const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState()

  
  useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
      }
    }, []);

       // logout the user
       const handleLogout = () => {
        setUser({});
        setEmail("");
        setPassword("");
        localStorage.clear();
        window.location.reload(false);
      };
      
    
    const handleSubmit = async e => {
      e.preventDefault();
      const user = { email, password };
      const response = await axios.post(
        'http://localhost:8080/login',
        user
      );
      
      // Set the state of the user
      setUser(response.data)

      // Store the user in localStorage
      localStorage.setItem("user", JSON.stringify(response.data))
      
    };

    // if there's a user show the message below
    if (user) {
      return (
        <div>
          {user.name} is loggged in
          <button onClick={ handleLogout }>logout</button>
        </div>
      );
    } 

    
    // if there's no user, show the login form
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"> Email: </label>
        <input
        type="text"
        value={email}
        placeholder="Enter Email"
        onChange={({ target }) => setEmail(target.value)}
        />
        <div>
          <label htmlFor="password">password: </label>
          <input
          type="password"
          value={password}
          placeholder="Enter Password"
          onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" >Login</button>
      </form>
    );

    
  };

  export default Login;

//   const handleChange = (e) => {
//     var value = e.target.value === "" ? null : e.target.value;

//     setValues({
//       ...values,
//       [e.target.name]: value,
//     });
//   };

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch("http://localhost:8080/login", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
//   body: JSON.stringify(values),
//   credentials: 'include',
 
// });

//       if (response.status !== 200) {
//         throw new Error(`Login failed: ${response.status}`);
//       }

//       alert("Login successful!");
//       navigate("/");
//     } catch (e) {
//       alert(`Login failed: ${e.message}`);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <h1 className="title">Log In</h1>
//       </div>
//       <form className="box" onSubmit={onSubmit}>
//         <div className="field">
//           <label className="label">Email</label>
//           <div className="control">
//             <input
//               className="input"
//               name="email"
//               type="email"
//               value={values.email}
//               onChange={handleChange}
//               placeholder="e.g. alex@example.com"
//             />
//           </div>
//         </div>

//         <div className="field">
//           <label className="label">Password</label>
//           <div className="control">
//             <input
//               className="input"
//               name="password"
//               type="password"
//               value={values.password}
//               onChange={handleChange}
//               placeholder="********"
//             />
//           </div>
//         </div>

//         <button type="submit" className="button is-primary">Sign in</button>
//         <button className="button is-light">Forgot Password?</button>
//       </form>
//     </div>
//   );
// }