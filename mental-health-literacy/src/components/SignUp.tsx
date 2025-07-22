import { useFetcher } from "react-router-dom";
import CloseButton from "../components/CloseButton";
import { getError } from "utils/GetErrorHook";

function SignUp(props: any) {
  const fetcher = useFetcher();
  const error = getError();

  if (fetcher.data?.status == 200 && !error) {
    props.close();
  }
  return (
    <>
      <CloseButton close={props.close}></CloseButton>
      <div className="login-form">
        <h1>Sign Up</h1>
        <fetcher.Form method="post" action="/api/register">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            required
          />

          <button type="submit">Create Account</button>
        </fetcher.Form>

        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Already have an account?{" "}
          <button className="switch-button" onClick={props.switch}>
            Log In
          </button>
        </p>
      </div>
    </>
  );
}

export default SignUp;
