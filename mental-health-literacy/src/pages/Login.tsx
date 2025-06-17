import { RequestAuth } from "../utils/RequestAuth";

function Login() {
  return (
    <div className="main-screen">
      <form onSubmit={RequestAuth}>
        <label>
          Username:
          <input type="text"></input>
        </label>
        <label>
          Password:
          <input type="text"></input>
        </label>
        <button type="submit">Submit</button>
      </form>
      <button type="button">Register</button>
    </div>
  );
}

export default Login;
