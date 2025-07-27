import { useFetcher } from "react-router-dom";
import CloseButton from "../components/CloseButton";
import useUserError from "utils/useUserError";

function SignUp(props: any) {
  const fetcher = useFetcher();
  const error = useUserError();

  if (fetcher.data?.status == 200 && !error) {
    props.close();
  }
  return (
    <>
      <CloseButton close={props.close}></CloseButton>
      <div className="auth-form">
        <h1>Sign Up</h1>
        <fetcher.Form method="post" action="/api/register">
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
            placeholder="Create a password"
            required
          />

          <button type="submit">Create Account</button>
        </fetcher.Form>

        <p className="switch-container">
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
