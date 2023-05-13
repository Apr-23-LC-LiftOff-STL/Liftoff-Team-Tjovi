
import { useState } from "react";

export default function LostPassword() {
  const [values, setValues] = useState({
    email: "",
  });
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
  return (
    <div>
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
};
