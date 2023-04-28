export default function Login() {
  return (
    <div>
      <div>
      <h1 className="title">Log In</h1>
      </div>
      <form className="box">
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="e.g. alex@example.com"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" placeholder="********" />
          </div>
        </div>

        <button className="button is-primary">Sign in</button>
        <button className="button is-light">Forgot Password?</button>
      </form>
    </div>
  );
}
