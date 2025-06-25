import { Link } from "react-router-dom";
import "./Login.css";
import BackButton from "../components/BackButton";
function Login() {
  return (
    <>
      <BackButton />

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
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
