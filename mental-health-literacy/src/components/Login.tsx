import "./Login.css";
import CloseButton from "./CloseButton";
function Login(props: any) {
  return (
    <>
      <CloseButton close={props.close}></CloseButton>

      <div className="login-form">
        <h1>Login</h1>
        <form>
          <label>
            Email:
            <input type="email" placeholder="Enter your email" required />
          </label>

          <label>
            Password:
            <input type="password" placeholder="Enter your password" required />
          </label>

          <button type="submit">Log In</button>
        </form>

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
