import MovieBar from "../components/MovieBar/MovieBar"

export default function Login() {
    return (
        <div>
        <div className="title is-4 ml-6 mt-4 has-text-grey-dark">My Profile</div>
      <div>
        <form className="box">
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="e.g. alex@example.com"
                name="email"
              />
            </div>
          </div>
  
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" type="password" placeholder="********" />
            </div>
          </div>
  
          <div className="field">
            <label className="label">Verify Password</label>
            <div className="control">
              <input className="input" type="password" placeholder="********" />
            </div>
          </div>
  
          <div className="field">
            <label className="label">Street Address</label>
            <div className="control">
              <input className="input" type="text" name="address1" />
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
              <input className="input" type="text" name="city" />
            </div>
          </div>
  
          <div className="field">
            <label className="label">State</label>
            <div className="control">
              <input className="input" type="text" name="state" />
            </div>
          </div>
  
          <div className="field">
            <label className="label">Telephone</label>
            <div className="control">
              <input className="input" type="tel" name="tel" placeholder="(555) 555-5555" />
            </div>
          </div>
  
          <button className="button is-primary">Update Profile</button>
          <button className="button is-light">Cancel Changes</button>
        </form>
      </div>
      <MovieBar />
      </div>
    );
  }