import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={nav}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "20px" }}>💼</span>
        <span style={{ fontWeight: "600", color: "#1e293b" }}>Expense Splitter: Receipt Manager</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>
            {user.name || "User"}
          </div>
          <div style={{ fontSize: "12px", color: "#64748b", textTransform: "capitalize" }}>
            {user.role || "User"}
          </div>
        </div>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "600",
          fontSize: "14px"
        }}>
          {user.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <button 
          onClick={logout}
          style={{
            background: "#fee2e2",
            color: "#dc2626",
            padding: "8px 16px",
            fontSize: "13px"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 24px",
  background: "#fff",
  borderBottom: "1px solid #e2e8f0",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
};

export default Navbar;