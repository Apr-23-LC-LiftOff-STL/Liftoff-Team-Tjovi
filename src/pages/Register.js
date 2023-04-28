export default function Register() {
  return (
    <div>
      <div>
        <h2>Register</h2>
      </div>
      <form>
        <div>
          <label>
            First Name
            <input text="firstname" required></input>
          </label>
        </div>
        <div>
          <label>
            Last Name
            <input text name="lastname" required></input>
          </label>
        </div>
        <div>
          <label>
            Telephone Number
            <input text name="tel" required></input>
          </label>
        </div>
        <div>
          <label>
            Street Address
            <input text name="address1" required></input>
          </label>
        </div>
        <div>
          <label>
            Building or Suite #
            <input text name="address2"></input>
          </label>
        </div>
        <div>
          <label>
            City
            <input text name="city" required></input>
          </label>
        </div>
        <div>
          <label>
            State
            <input text name="state" required></input>
          </label>
        </div>
        <div>
          <label>
            Zip Code
            <input text name="zipcode" required></input>
          </label>
        </div>
        <button className="button is-primary">Register</button>
      </form>
    </div>
  );
}
