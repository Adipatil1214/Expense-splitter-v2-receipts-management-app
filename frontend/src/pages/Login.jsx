import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter both Gmail and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 400 || err.response?.status === 401) {
        setError("Invalid Gmail or password.");
      } else {
        setError("Unable to login. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome back</h2>
          <p className="lead">
            Login to access your expense dashboard and manage claims with ease.
          </p>
        </div>

        <div className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <label className="auth-label">
            Gmail
            <input
              className="auth-input"
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="auth-label">
            Password
            <input
              className="auth-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <div className="auth-footer">
          <p>
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")} className="auth-link">
              Sign up
            </span>
          </p>
        </div>

        <div className="credential-cards">
          <div className="credential-card">
            <h4>Admin credentials</h4>
            <p>Gmail: admin@gmail.com</p>
            <p>Password: 123</p>
          </div>
          <div className="credential-card">
            <h4>User credentials</h4>
            <p>Gmail: adi@gmail.com</p>
            <p>Password: 123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
