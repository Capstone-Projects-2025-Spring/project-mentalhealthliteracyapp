import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="login-form">
            <h1>Login</h1>
            <form>
                <label>Email:</label>
                <input type="email" placeholder="Enter your email" required />

                <label>Password:</label>
                <input type="password" placeholder="Enter your password" required />

                <button type="submit">Log In</button>
            </form>

            <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                Don’t have an account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
}

export default Login;



