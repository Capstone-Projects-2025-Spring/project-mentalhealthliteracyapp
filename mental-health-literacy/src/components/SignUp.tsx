import CloseButton from "../components/CloseButton";

function SignUp(props) {
  return (
    <>
      <CloseButton close={props.close}></CloseButton>
      <div className="login-form">
        <h1>Sign Up</h1>
        <form>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password:</label>
          <input type="password" placeholder="Create a password" required />

          <label>Display Name:</label>
          <input type="text" placeholder="Enter your name" required />

          <button type="submit">Create Account</button>
        </form>

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
