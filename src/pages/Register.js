export default function Login() {
  return (
    <div>
      <h1 className="title">Register</h1>
    <div>
      <form className="box">
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email" required
              placeholder="e.g. alex@example.com"
              name="email"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input"
             type="password" required
             placeholder="********" />
          </div>
        </div>

        <div className="field">
          <label className="label">Verify Password</label>
          <div className="control">
            <input className="input"
             type="password" required
              placeholder="********" />
          </div>
        </div>

        <div className="field">
          <label className="label">Street Address</label>
          <div className="control">
            <input className="input"
             type="text" required 
             name="address1" />
          </div>
        </div>

        <div className="field">
          <label className="label">Suite or Floor No.</label>
          <div className="control">
            <input className="input" type="text" name="address2" placeholder="(optional)"/>
          </div>
        </div>

        <div className="field">
          <label className="label">City</label>
          <div className="control">
            <input className="input" 
            type="text" required 
            name="city" />
          </div>
        </div>

        <div className="field">
          <label className="label">State</label>
          <div className="control">
            <input className="input"
             type="text" required
              name="state" />
          </div>
        </div>

        <div className="field">
          <label className="label">Telephone</label>
          <div className="control">
            <input className="input"
             type="tel" name="tel" required
              placeholder="(555) 555-5555" />
          </div>
        </div>

        <button className="button is-primary">Register</button>
        <button className="button is-light">Cancel Registration</button>
      </form>
    </div>
    </div>
  );
}