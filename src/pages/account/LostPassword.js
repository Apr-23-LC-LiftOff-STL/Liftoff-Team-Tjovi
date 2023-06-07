
import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";

export default function LostPassword() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    
  });

  const handleChange = (e) => {
    var value = e.target.value === "" ? null : e.target.value;

    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    const newPassword = generateRandomPassword();
    console.log("These are the handleSubmit values")
    console.log(values.name)
    console.log(values.email)
    console.log(newPassword)
  sendEmail( values.name, values.email, newPassword) 


    // console.log(newPassword)
    // console.log(newPassword)
   // setValues({pwd: newPassword })
    // console.log(values.email)
     //console.log(values.pwd)
    // const templateParams = {
    //   to_email: values.email,
    // pwd: values.pwd,
    //   to_name: values.name,
    // };
    // emailjs
    //   .sendForm(
    //     "service_i7rn969",
    //     "template_2v6984n",
    //     form.current,
    //     "Cy7tiuWbCkBC_n4MB", 
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //       alert("Your email was successfully sent");
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
  };
  

  const generateRandomPassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+";

    let newPassword = "";
    let length = 10
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    return newPassword;
  };

  const sendEmail = (name, email, newPassword) =>{
    const serviceId = "service_i7rn969"
    const templateId ="template_2v6984n"
    const userId = "Cy7tiuWbCkBC_n4MB"
    const templateParams = {
      to_email: email,
      pwd: newPassword,
      to_name: name
    }
emailjs.send(serviceId, templateId, templateParams, userId)
.then(
      (response) => {
        console.log(response.text);
        alert("Your email was successfully sent");
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        required
      />
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        required
      />
  {/* <label>Password</label>
      <input
        type="radio"
        name="pwd"
        value={values.pwd}
        onChange={handleChange}
        required
      /> */}

      <button type="submit" value="Send" >Send Password</button>
    </form>
    // <div form ref={form} onSubmit={sendEmail}>
    //   <div class="field">
    //     <label class="label">Email</label>
    //     <input
    //       className="input "
    //       type="email"
    //       value={values.email}
    //       onChange={handleChange}
    //       required
    //       placeholder="e.g. alexsmith@gmail.com"
    //       name="email"
    //     />
    //   </div>
    //   <div className="field">
    //     <p className="control">
    //     <input type="submit" value="Send" />
    //     </p>
    //   </div>
    // </div>
  );
}
