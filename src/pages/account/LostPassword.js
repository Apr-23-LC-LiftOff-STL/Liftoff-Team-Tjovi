// import React, { useState, useRef } from "react";
// import emailjs from "emailjs-com";
// import axios from "axios";

// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';
// export default function LostPassword() {
//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     pwd:""
//   });

//   const handleChange = (e) => {
//     var value = e.target.value === "" ? null : e.target.value;
//     setValues({
//       ...values,
//       [e.target.name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newPassword = generateRandomPassword();
//     console.log("These are the handleSubmit values");
//     console.log(values.name);
//     console.log(values.email);
//     console.log(newPassword);
//     console.log("this is the real password "+values.pwd)
//     const username = values.email;

//     try {
//       const response = await axios.get(
//         `http://localhost:8080/profile/isUser/${username}`
        
//       );
//       if (response.status === 200 || response.status === 201) {
//         const changePasswordResponse = await axios.put(
//           `http://localhost:8080/profile/changePassword/${username}`,
//           { password: newPassword }
//         );
  
//         if (changePasswordResponse.status === 200 || changePasswordResponse.status === 201) {
//           sendEmail(values.name, values.email, newPassword);
//           toast.success("Your password was successfully updated!");
//         } else {
//           throw new Error(`Password update failed: ${changePasswordResponse.status}`);
//         }
//       } else {
//         throw new Error(`User check failed: ${response.status}`);
        
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Password update unsuccessful!");
//     }
//     //   if (response.status === 200 || response.status === 201) {
//     //     //toast.success("This user exists");
//     //     const response = await fetch(`http://localhost:8080/profile/changePassword/${username}`, {
//     //   method: "PUT",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify(newPassword),
//     // });
        
//     //     sendEmail(values.name, values.email, newPassword);
        
//     //     toast.success("Your password was successfully updated!");
//     //   } else {
//     //     throw new Error(`Request failed: ${response.status}`);
//     //   }
//     // } catch (error) {
      
//     //   toast.error("Password update unsuccessful!");
//     //   return
//     // }
//   };

//   const generateRandomPassword = () => {
//     const charset =
//       "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+";
//     let newPassword = "";
//     let length = 10;
//     for (let i = 0; i < length; i++) {
//       const randomIndex = Math.floor(Math.random() * charset.length);
//       newPassword += charset[randomIndex];
//     }
//     return newPassword;
//   };

//   const sendEmail = (name, email, newPassword) => {
//     const serviceId = "service_i7rn969";
//     const templateId = "template_2v6984n";
//     const userId = "Cy7tiuWbCkBC_n4MB";
//     const templateParams = {
//       to_email: email,
//       pwd: newPassword,
//       to_name: name,
//     };

//     emailjs.send(serviceId, templateId, templateParams, userId).then(
//       (response) => {
//         console.log(response.text);
//         alert("Your email was successfully sent");
//       },
//       (error) => {
//         console.log(error.text);
//       }
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Name</label>
//       <input
//         type="text"
//         name="name"
//         value={values.name}
//         onChange={handleChange}
//         required
//       />
//       <label>Email</label>
//       <input
//         type="email"
//         name="email"
//         value={values.email}
//         onChange={handleChange}
//         required
//       />
//       <button type="submit" value="Send">
//         Send Password
//       </button>
//       <ToastContainer/>
//     </form>
//   );
// }
