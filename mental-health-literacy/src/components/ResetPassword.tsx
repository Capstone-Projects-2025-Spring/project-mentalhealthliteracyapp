import React, { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import useUserError from "utils/useUserError";
import CloseButton from "./CloseButton";

function ResetPassword({
  openLogin,
  close,
}: {
  openLogin: () => void; // function to open the login modal
  close: () => void; // function to close all modals
}) {
  let success = false;
  const fetcher = useFetcher();
  const error = useUserError();
  const resetPasswordRef = useRef<HTMLDialogElement>(null);
  resetPasswordRef.current?.showModal();

  if (fetcher.data?.status == 200 && !error) {
    success = true;
  }
  return (
    <dialog
      ref={resetPasswordRef}
      className="dialog dialog-centered"
      onClose={close}
    >
      {success ? (
        <>
          <CloseButton close={close}></CloseButton>
          <div style={{ margin: "5rem 0" }}>
            <h1>Successfully reset password</h1>
            <p>Check your e-mail for more instructions</p>
          </div>
        </>
      ) : (
        <>
          <CloseButton close={close}></CloseButton>
          <div className="auth-form">
            <h1>Reset Password</h1>
            <fetcher.Form method="post" action="/api/reset-password">
              <p className="error">{error}</p>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />

              <button type="submit">Reset Password</button>
            </fetcher.Form>

            <p className="switch-container">
              Already have an account?{" "}
              <button className="switch-button" onClick={openLogin}>
                Login In
              </button>
            </p>
          </div>
        </>
      )}
    </dialog>
  );
}

export default ResetPassword;
