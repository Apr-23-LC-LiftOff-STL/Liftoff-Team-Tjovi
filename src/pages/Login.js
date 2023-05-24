import MovieBar from "../components/MovieBar/MovieBar"

export default function Login() {
  return (
    <div>
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
              Log In
            </a>
          </li>
        </ul>
      </nav>
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
      <MovieBar />
    </div>
  );
}
