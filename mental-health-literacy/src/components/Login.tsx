import "./Login.css";
import CloseButton from "./CloseButton";
import { Form, useFetcher } from "react-router-dom";
function Login(props: any) {
  const fetcher = useFetcher();
  return (
    <>
      <CloseButton close={props.close}></CloseButton>

      <div className="login-form">
        <h1>Login</h1>
        <fetcher.Form method="post" action="/api/login">
          <label>
            Email:
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </label>

          <button type="submit">Log In</button>
        </fetcher.Form>

        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Don’t have an account?{" "}
          <button className="switch-button" onClick={props.switch}>
            Sign Up
          </button>
        </p>
      </div>
    </>
  );
}

export default Login;
