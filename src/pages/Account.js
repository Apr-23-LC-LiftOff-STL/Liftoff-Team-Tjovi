import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Account() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    role: "",
    verifyPassword: "",
    firstName:"",
    lastName:"",
    phoneNumber:"",
    streetAddress: "",
    suite: "",
    city: "",
    state: "",
    zipCode:""
  });
  const saveFormData = async () => {
    const response = await fetch("http://localhost:8080/register", {
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
  const handleChange = (e) => {
  
    var value = e.target.value === "" ? null : e.target.value;

    setValues({
      ...values,
      [e.target.name]: value,
      
    });
  };

    return (
      <div className="account">
        <h1 className="title">Account</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dolor assumenda, itaque nesciunt alias voluptatum nobis blanditiis eos officiis aperiam earum eum vel quas odio optio, distinctio ab sunt unde incidunt ipsum omnis amet magnam accusantium aut! Excepturi, cupiditate iusto!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus veniam ducimus eligendi nihil, cumque ab eveniet modi architecto quidem, non odit saepe facere voluptas esse mollitia illo fuga exercitationem id dicta iusto eaque numquam quaerat ad! Fugit velit beatae laudantium.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus veniam ducimus eligendi nihil, cumque ab eveniet modi architecto quidem, non odit saepe facere voluptas esse mollitia illo fuga exercitationem id dicta iusto eaque numquam quaerat ad! Fugit velit beatae laudantium.</p>
      </div>
    )
  }
  