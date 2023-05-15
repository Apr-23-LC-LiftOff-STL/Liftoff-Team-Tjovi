import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const userInfo = ""
  const handleChange = (e) => {
    var value = e.target.value === "" ? null : e.target.value;

    setValues({
      ...values,
      [e.target.name]: value,
    });
  };
  function verifyEmailAndPassword(){
    if (values.email !== userInfo.email || values.password !== userInfo.password){
      alert("Email or Password is incorrect!")
    } 
    else {return
    }
   
     
     }
  const saveLoginData = async () => {
    const response = await fetch("http://localhost:8080/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.status !== 201) {
      throw new Error(`Request failed: ${response.status}`);
    }
  };
  const forgotPassword = async(event)=>{
    event.preventDefault();
    navigate("/lostPassword")
  };
  const onSubmit = async (event) => {
    console.log("you are here");

    event.preventDefault();
    
   
      try {
        await saveLoginData();
         verifyEmailAndPassword();
        alert("Your login was successful");

        navigate("/");
      } catch (e) {
        alert(`Login failed! ${e.message}`);
        console.log("Failed");
      }
    }
  

    return (
      <div >
        <div className="field is-small">
          <p className="control is-horizontal has-icons-left has-icons-right">
            <input className="input " 
            type="email"
            value={values.email}
            onChange={handleChange}
            required
             placeholder="Email" 
             name="email"/>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control is-horizontal has-icons-left">
            <input className="input" 
            type="password" 
            value={values.password}
                onChange={handleChange}
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
            placeholder="Password" 
            name="password"/>
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-primary" onClick={onSubmit}>Login</button>
             <button className="button is-secondary" onClick={forgotPassword}>Forgot Password</button> 
          </p>
        </div>
      </div>
    );
  };

