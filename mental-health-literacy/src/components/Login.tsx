import "./Login.css";
import CloseButton from "./CloseButton";
import { useFetcher } from "react-router-dom";
import useUserError from "utils/useUserError";
import { useEffect, useRef } from "react";
function Login({
  openSignUp,
  openResetPassword,
  close,
}: {
  openSignUp: () => void; // function to open the signup modal
  openResetPassword: () => void; // function to bring up reset password modal
  close: () => void; // function to close all modals
}) {
  const fetcher = useFetcher();
  const error = useUserError();

  const loginRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    loginRef.current?.showModal();
  }, []);

  if (fetcher.data?.status == 200 && !error) {
    close();
  }
  return (
    <dialog ref={loginRef} className="dialog dialog-centered" onClose={close}>
      <CloseButton close={close}></CloseButton>
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

        <div className="switch-container">
          <div>
            Forgot your password?{" "}
            <button
              className="switch-button"
              onClick={() => openResetPassword()}
            >
              Reset Password
            </button>
          </div>
          <div>
            Don’t have an account?{" "}
            <button className="switch-button" onClick={openSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default Login;
