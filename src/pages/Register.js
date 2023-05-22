import MovieBar from "../components/MovieBar/MovieBar"

export default function Login() {
  return (
    <div>
           <nav
        className="breadcrumb is-medium has-succeeds-separator pl-6 pt-1 pb-2"
        aria-label="breadcrumbs"
      >
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li className="is-active">
            <a href="#" aria-current="page">
              Register
            </a>
          </li>
        </ul>
      </nav>
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

        <button className="button is-primary">Register</button>
        <button className="button is-light">Cancel Registration</button>
      </form>
    </div>
    <MovieBar />
    </div>
  );
}