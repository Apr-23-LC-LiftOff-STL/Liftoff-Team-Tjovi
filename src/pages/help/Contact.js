import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";


export default function Contact(){
  const [values, setValues] = useState({
    email: "",
  name:"",
  // errors:{}
})
const navigate = useNavigate();
const handleResetFields = (e) => {
  e.preventDefault();
  e.target.closest("form").reset();
  navigate("/help/contact");
};
const handleChange = (e) => {
  var value = e.target.value === "" ? null : e.target.value;
  setValues({
    ...values,
    [e.target.name]: value,
  });
};
  const form = useRef();

  const sendEmail = (e) => {
       e.preventDefault(); 
      //  let errors = {};
      
  // if (values.name.trim() === "") {
  //   errors.name = "Name is required";
   
  // }
  // if (!/\S+@\S+\.\S+/.test(values.email)) {
  //   errors.email = "Invalid email address";
   
  // }

  // if (Object.keys(errors).length > 0) {
    
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     errors: errors,
  //   }));
  //   return;
  // }
       const templateParams ={
from_email: values.email,
from_name: values.name
};


    emailjs.sendForm('service_i7rn969', 'template_ko2ve92', form.current, 'Cy7tiuWbCkBC_n4MB')
      .then((result) => {
          console.log(result.text);
          alert("Your email was successfully sent")
      }, (error) => {
          console.log(error.text);
      });
      // console.log(values)
      // console.log(values.email)
      // console.log(values.name)
  };

  // <form ref={form} onSubmit={sendEmail}>
  //     <label>Name</label>
    
  //     <label>Email</label>
  //     <input type="email" name="email" value={values.email} onChange={handleChange} required />
  //     <label>Message</label>
  //     <textarea name="message" required/>
  //     <input type="submit" value="Send" />
  //   </form>
  return ( 
    <div>
    <p className="mx-6 pb-2">
      If you have a question not addressed in the FAQ, please send us a
      message here.
    </p>
    <div
      className="mx-6 px-5 py-5 box"
      style={{
        borderStyle: "solid",
        borderColor: "lightgray",
        borderWidth: "1px",
      }}
    >
      <form ref={form} onSubmit={sendEmail}>
        <div className="columns">
          <div className="column is-2">
            <div className="field">
              <label className="label">
                <span>Your Name</span>{" "}
                {/* {values.errors.name && (
        <span className="error-message">{values.errors.name}</span>
      )} */}
              </label>
              <div className="control">
                 <input className='input is normal' type="text" name="name" value={values.name} onChange={handleChange} 
                 required/>
              </div>
            </div>
          </div>
          <div className="column is-2">
            <div className="field">
              <label className="label">
                <span>Your E-mail</span>{" "}
                {/* {values.errors.email && (
        <span className="error-message">{values.errors.email}</span>
      )} */}
              </label>
              <div className="control">
              <input className='input is normal' type="email" name="email" value={values.email} onChange={handleChange} required minLength={50} maxLength={2000}/>
              </div>
            </div>
          </div>
        </div>
        <label>
          <div className="field">
            <label className="label">
              <span>Your Message</span>{" "}
            </label>
            
            <div className="control">
              <textarea className="textarea is small" name="message"  
              minLength={10}
              maxLength={3000}
              title='Your message must be 10-3000 characters long'
              required></textarea>
            </div>
          </div>
        </label>
        <div className="field">
          <div className="control">
            <label className="checkbox pt-2">
              <input type="checkbox" name="tac" />
              &nbsp;I agree to the <a href="#">terms and conditions &nbsp;</a>
              
            </label>
          </div>
        </div>
        
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-primary"  input type="submit" value="Send" >Submit</button>
          </div>
          <div className="control">
            <button className="button is-warning" onClick={handleResetFields}>
              Reset Fields
            </button>
          </div>
        </div>
        </form>
    </div>
  </div>
    
  );
};
{/* //   const data = useActionData() 

//   return (
//     <div className="contact">
//                  <nav */}
{/* //         className="breadcrumb is-medium has-succeeds-separator pl-6 pt-1 pb-2"
//         aria-label="breadcrumbs"
//       >
//         <ul>
//           <li>
//             <a href="/">Home</a>
//           </li>
//           <li className="is-active">
//             <a href="#" aria-current="page">
//               Contact Us
//             </a>
//           </li>
//         </ul>
//       </nav>
//       <Form method="post" action="/help/contact">
//         <label>
//           <span>Your email:</span>
//           <input type="email" name="email" required />
//         </label>
//         <label>
//           <span>Your message:</span>
//           <textarea name="message" required></textarea>
//         </label>
//         <button className="button is-primary">Submit</button>

//         {data && data.error && <p>{data.error}</p>}
//       </Form>
//     </div>
//   )
// }

// export const contactAction = async ({ request }) => { */}
{/* //   const data = await request.formData()

//   const submission = { */}
{/* //     email: data.get('email'),
//     message: data.get('message')
//   }

//   console.log(submission)

//   // send your post request

//   if (submission.message.length < 10) { */}
{/* //     return {error: 'Message must be over 10 chars long.'}
//   }

//   // redirect the user
//   return redirect('/') */}
