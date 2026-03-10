import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔹 Get stored user from registration
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!storedUser) {
      alert("No account found. Please register.");
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      // ✅ Save name for dashboard
      localStorage.setItem("userName", storedUser.firstName);

      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="card">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

        </form>

        <p style={{ marginTop: "15px" }}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;