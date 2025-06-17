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
        </div>
    );
}

export default Login;



