import { useFetcher } from "react-router-dom";
import CloseButton from "../components/CloseButton";
import useUserError from "utils/useUserError";
import { useEffect, useRef } from "react";

function SignUp({
  openLogin,
  close,
}: {
  openLogin: () => void; // function to open the login modal
  close: () => void; // function to close all modals
}) {
  const fetcher = useFetcher();
  const error = useUserError();
  const registerRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    registerRef.current?.showModal();
  }, []);
  if (fetcher.data?.status == 200 && !error) {
    close();
  }
  return (
    <dialog
      ref={registerRef}
      className="dialog dialog-centered"
      onClose={() => close()}
    >
      <CloseButton close={close}></CloseButton>
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
          <button className="switch-button" onClick={() => openLogin()}>
            Log In
          </button>
        </p>
      </div>
    </dialog>
  );
}

export default SignUp;
