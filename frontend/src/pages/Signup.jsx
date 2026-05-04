import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");
    if (!name || !email || !password) {
      setError("Please complete all fields before signing up.");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/auth/signup", { name, email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Unable to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create your account</h2>
          <p className="lead">
            Join now and start tracking expenses with a clean, secure dashboard.
          </p>
        </div>

        <div className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <label className="auth-label">
            Full name
            <input
              className="auth-input"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button onClick={handleSignup} disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </div>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="auth-link">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;