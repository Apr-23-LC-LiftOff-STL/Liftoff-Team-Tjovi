import { useState } from "react";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function LostPassword() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    pwd:"This password",
  });
  const generateRandomPassword = (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+";

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  };

  const handleChange = (e) => {
    var value = e.target.value === "" ? null : e.target.value;

    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  //there should be a check to see if the user actually exists
  //set up either emailer to send said password from the database(if possible)
  //or set up an alert/message with the password or that the password was sent to the email with no functionality

  // const checkIfUserExists = async () => {

  //   const userEmail = values.email;
  //   const response = await fetch("http://localhost:8080/user/"+ {userEmail}, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(values),
  //   });

  //   if (response.status !== 201) {
  //     throw new Error(`Request failed: ${response.status}`);
  //   }
  // };
  // const updateUserPassword = async () => {
  //   const userEmail = values.email;
  //   const response = await fetch(
  //     "http://localhost:8080/user/" + { userEmail },
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(values),
  //     }
  //   );

  //   if (response.status !== 201) {
  //     throw new Error(`Request failed: ${response.status}`);
  //   }
  // };
  // const onSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     //await checkIfUserExists();
  //     // await updateUserPassword();
  //     sendEmail()
  //     alert("Your password was sent");
  //   } catch (e) {
  //     alert(`Failed! ${e.message}`);
  //     console.log("Failed");
  //   }
  // };
  const form = useRef();

  const sendEmail = (e) => {
    const newPassword = generateRandomPassword(10);
    // console.log(newPassword)
    
    // console.log(newPassword)
    // console.log(values.pwd)
    const templateParams = {
      to_email: values.email,
    pwd: values.password,
      to_name: values.name,
    };
    e.preventDefault();
    setValues({ pwd: newPassword });
    // console.log(values.email)
    // console.log(values.pwd)
    emailjs
      .sendForm(
        "service_i7rn969",
        "template_2v6984n",
        form.current,
        "Cy7tiuWbCkBC_n4MB", 
           templateParams
       
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Your email was successfully sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <form ref={form} onSubmit={sendEmail}>
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

      <input type="submit" value="Send" />
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
