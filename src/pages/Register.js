import React, {useState } from 'react';
import axios from 'axios';


export default function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/register', {
        username,
        password,
        verifyPassword,
        streetAddress,
        zipCode,
        city,
        state,
        phoneNumber,
      });
      // Handle successful registration
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };


  
    return (
      <div>
        <h1 className="title">Register</h1>
        <div>
          <form className="box" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="e.g. alex@example.com"
                  name="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
  
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
  
            <div className="field">
              <label className="label">Verify Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="********"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                />
              </div>
            </div>
  
            <div className="field">
              <label className="label">Street Address</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="address1"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
              </div>
            </div>
  
            <div className="field">
              <label className="label">Zip</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="address2"
                  placeholder="(optional)"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
            </div>
  
            <div className="field">
              <label className="label">City</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
  
            <div className="field">
              <label className="label">State</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>
        
              <div className="field">
                <label className="label">Telephone</label>
                <div className="control">
                  <input
                    className="input"
                    type="tel"
                    name="tel"
                    placeholder="(555) 555-5555"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
        
              <button className="button is-primary" type="submit">Register</button>
              <button className="button is-light" type="button" onClick={() => window.location.reload()}>Cancel Registration</button>
            </form>
          </div>
        </div>
    );
}