import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
export default function Contact(){
  const [values, setValues] = useState({
    email: "tevrese12@gmail.com",
  name:"",
})

const handleChange = (e) => {
  var value = e.target.value === "" ? null : e.target.value;
  setValues({
    ...values,
    [e.target.name]: value,
  });
};
  const form = useRef();

  const sendEmail = (e) => {
    const templateParams ={
from_email: values.email,
from_name: values.name
};
    e.preventDefault();

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

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="name" value={values.name} onChange={handleChange} required/>
      <label>Email</label>
      <input type="email" name="email" value={values.email} onChange={handleChange} required />
      <label>Message</label>
      <textarea name="message" required/>
      <input type="submit" value="Send" />
    </form>
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
