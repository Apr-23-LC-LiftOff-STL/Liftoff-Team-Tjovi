export default function Login() {
  return (
    <div>
      <div>
        <h2>Log In</h2>
      </div>
      <form>
        <div>
          <label>
            E-Mail
            <input text name="email" required></input>
          </label>
        </div>
        <div>
          <label>
            Password
            <input text name="password" required></input>
          </label>
        </div>
       <button className="button is-light">Forgot Password?</button>
        <button className="button is-primary">Log In</button>
      </form>
    </div>
  );
}
