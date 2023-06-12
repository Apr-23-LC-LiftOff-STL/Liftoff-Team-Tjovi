import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';

export default function Contact() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const [values, setValues] = useState({
    email: '',
    name: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const form = useRef();

  const handleResetFields = (e) => {
    e.preventDefault();
    setValues({
      email: '',
    name: '',
    message: '',
    })
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const value = e.target.value === '' ? null : e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  const validateForm = () => {
    const { email, name, message } = values;
    const newErrors = {};

    if (!email || !validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

    if (name.length > 40) {
      newErrors.name = 'Name must be less than 40 characters long.';
    }
    if (!message) {
      newErrors.message =
        'Message is required';
    }
    if (message.length < 10 || message.length > 3000) {
      newErrors.message =
        'Message must be between 10 and 3000 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    try {
      if (isValid) {
        const {email, name, message} = values;
        // if(!message){
        //   toast.error("Please enter a message");
        //   return
        // }
        const templateParams = {
          from_email: email,
          from_name: name,
          message: message,
        };

        emailjs
          .send(
            'service_i7rn969',
            'template_ko2ve92',
            templateParams,
            'Cy7tiuWbCkBC_n4MB'
          )
          .then(
            (result) => {
              console.log(result.text);
              toast.success('Your email was successfully sent.');
            },
            (error) => {
              console.log(error.text);
              toast.error('Failed to send your email.');
            }
          );
          setValues({
            email: '',
          name: '',
          message: '',
          })
      }
    } catch (e) {
      toast.error(`Failed to send your email. ${e.message}`);
    }
  };

  return (
    <div>
      <p className="mx-6 pb-2">
        If you have a question not addressed in the FAQ, please send us a
        message here.
      </p>
      <div
        className="mx-6 px-5 py-5 box"
        style={{
          borderStyle: 'solid',
          borderColor: 'lightgray',
          borderWidth: '1px',
        }}
      >
        <form ref={form} onSubmit={sendEmail}>
          <div className="columns">
            <div className="column is-3">
              <div className="field">
                <label className="label">
                  <span>Your Name</span>
                </label>
                <div className="control">
                  <input
                    className={`input ${errors.name ? 'is-danger' : ''}`}
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && (
                  <p className="help is-danger">{errors.name}</p>
                )}
              </div>
            </div>
            <div className="column is-3">
              <div className="field">
                <label className="label">
                  <span>Your E-Mail</span>
                </label>
                <div className="control">
                  <input
                    className={`input ${errors.email ? 'is-danger' : ''}`}
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && (
                  <p className="help is-danger">{errors.email}</p>
                )}
              </div>
            </div>
          </div>
          <label>
            <div className="field">
              <label className="label">
                <span>Message</span>
              </label>
              <div className="control">
                <textarea
                  className={`textarea ${
                    errors.message ? 'is-danger' : ''
                  }`}
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  minLength={10}
                  maxLength={3000}
                  title="Your message must be 10-3000 characters long."
                />
              </div>
              {errors.message && (
                <p className="help is-danger">{errors.message}</p>
              )}
            </div>
          </label>
          <div className="field">
            <div className="control">
              <label className="checkbox pt-2">
                <input type="checkbox" name="tac" />
                &nbsp;I agree to the{' '}
                <a href="#">terms and conditions&nbsp;</a>
              </label>
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary" type="submit">
                Submit
              </button>
            </div>
            <div className="control">
              <button
                className="button is-warning"
                type="button"
                onClick={handleResetFields}
              >
                Reset Fields
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
