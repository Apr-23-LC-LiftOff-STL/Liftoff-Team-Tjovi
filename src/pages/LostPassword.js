import { useState } from "react";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function LostPassword() {
  const [values, setValues] = useState({
    email: "",
    pwd: "",
  });

  const handleChange = (e) => {
    var value = e.target.value === "" ? null : e.target.value;

    setValues({
      ...values,
      [e.target.name]: value,
    });
  };
  var generator = require("generate-password");

  const password = generator.generate({
    length: 10,
    numbers: true,
    symbol: true,
  });
  
  //there should be a check to see if the user actually exists
  //set up either emailer to send said password from the database(if possible)
  //or set up an alert/message with the password or that the password was sent to the email with no functionality

  const saveEmailData = async () => {
    const response = await fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.status !== 201) {
      throw new Error(`Request failed: ${response.status}`);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await saveEmailData();
      alert("Your password was sent");
    } catch (e) {
      alert(`Failed! ${e.message}`);
      console.log("Failed");
    }
  };
  const form = useRef();

  const sendEmail = (e) => {
    const templateParams = {
      from_email: values.email,
    };
    e.preventDefault();

    emailjs
      .sendForm(
        "service_i7rn969",
        "template_2v6984n",
        form.current,
        "Cy7tiuWbCkBC_n4MB"
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
    <div form ref={form} onSubmit={sendEmail} v>
      <div class="field">
        <label class="label">Email</label>
        <input
          className="input "
          type="email"
          value={values.email}
          onChange={handleChange}
          required
          placeholder="e.g. alexsmith@gmail.com"
          name="email"
        />
      </div>
      <div className="field">
        <p className="control">
          <button className="button is-primary" onClick={onSubmit}>
            Send Password
          </button>
        </p>
      </div>
    </div>
  );
}
