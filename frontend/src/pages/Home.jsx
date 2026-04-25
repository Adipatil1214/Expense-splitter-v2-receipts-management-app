import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      <div style={card}>
        
        {/* Title FIXED (no collision) */}
        <h1 style={title}>
          <span style={{ color: "#4f46e5" }}>Expense</span>{" "}
          <span style={{ color: "#111827" }}>Splitter</span>
        </h1>

        {/* Intro */}
        <p style={subtitle}>
          Expense Splitter – Receipt Manager
        </p>

        <p style={desc}>
          Track expenses, upload receipts, and manage approvals easily in one place.
        </p>

        {/* Buttons */}
        <div style={buttonGroup}>
          <button style={loginBtn} onClick={() => navigate("/login")}>
            Login
          </button>

          <button style={signupBtn} onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>

      </div>
    </div>
  );
}

/* Page Center */
const page = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f3f4f6",
};

/* Card */
const card = {
  width: "380px",
  padding: "30px",
  borderRadius: "16px",
  background: "#fff",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  textAlign: "center",
};

/* Title FIX */
const title = {
  marginBottom: "10px",
  fontSize: "32px",
  fontWeight: "700",
  display: "flex",
  justifyContent: "center",
  gap: "8px",
  flexWrap: "wrap",
};

/* Text */
const subtitle = {
  fontSize: "16px",
  fontWeight: "500",
  color: "#374151",
  marginBottom: "8px",
};

const desc = {
  fontSize: "14px",
  color: "#6b7280",
  marginBottom: "20px",
};

/* Buttons */
const buttonGroup = {
  display: "flex",
  gap: "12px",
  justifyContent: "center",
};

const loginBtn = {
  padding: "10px 18px",
  borderRadius: "8px",
  border: "none",
  background: "#4f46e5",
  color: "white",
  cursor: "pointer",
};

const signupBtn = {
  padding: "10px 18px",
  borderRadius: "8px",
  border: "1px solid #4f46e5",
  background: "white",
  color: "#4f46e5",
  cursor: "pointer",
};

export default Home;