import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    var value = e.target.value === "" ? null : e.target.value;

    setValues({
      ...values,
      [e.target.name]: value,
    });
  };
   const saveLoginData = async () => {
    const response = await fetch("http://localhost:8080/user", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      
    });
    if (response.status !== 201) {
      
      throw new Error(`Request failed: ${response.status}`);

    }
  };
  const onSubmit = async (event) => {
    console.log("you are here");
   
    event.preventDefault();
    if (values.password !== values.verifyPassword) {
     
    } else {
      try {
         await saveLoginData();
        alert("Your login was successful");
        
        
       
        navigate("/");
      } catch (e) {
        alert(`Login failed! ${e.message}`);
        console.log("Failed");
      }
    }

  return (
    <div>
      <div>
        <h1 className="title">Log In</h1>
      </div>
      <form className="box">
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="e.g. alex@example.com"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              placeholder="********"
            />
          </div>
        </div>

        <button className="button is-primary"onClick={onSubmit}>Sign in</button>
        <button className="button is-light">Forgot Password?</button>
      </form>
    </div>
  );
}
}
