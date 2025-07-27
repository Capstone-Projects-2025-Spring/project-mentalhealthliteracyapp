import "./Login.css";
import CloseButton from "./CloseButton";
import { useFetcher } from "react-router-dom";
import useUserError from "utils/useUserError";
function Login(props: any) {
  const fetcher = useFetcher();
  const error = useUserError();

  if (fetcher.data?.status == 200 && !error) {
    props.close();
  }
  return (
    <>
      <CloseButton close={props.close}></CloseButton>

      <div className="auth-form">
        <h1>Login</h1>
        <fetcher.Form method="post" action="/api/login">
          <p className="error">{error}</p>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />

          <button type="submit">Log In</button>
        </fetcher.Form>

        <p className="switch-container">
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
