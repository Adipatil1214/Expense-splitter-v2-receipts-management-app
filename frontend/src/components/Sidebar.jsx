import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    display: "block",
    padding: "12px 16px",
    margin: "4px 0",
    borderRadius: "8px",
    color: isActive(path) ? "#4f46e5" : "#475569",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    background: isActive(path) ? "rgba(99, 102, 241, 0.12)" : "transparent",
    transition: "all 0.2s ease"
  });

  return (
    <div
      style={{
        padding: "24px 16px",
        background: "#ffffff",
        height: "100vh",
        borderRight: "1px solid #e2e8f0"
      }}
    >
      {/* Logo / Brand */}
      <div
        style={{
          marginBottom: "32px",
          padding: "0 8px",
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: "20px"
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Expense Bar
        </h2>
      </div>

      {/* USER MENU */}
      <nav>
        <span
          style={{
            color: "#94a3b8",
            fontSize: "11px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "1px",
            padding: "0 8px"
          }}
        >
          Menu
        </span>

        <Link to="/dashboard" style={linkStyle("/dashboard")}>
          📊 Dashboard
        </Link>
        <Link to="/upload" style={linkStyle("/upload")}>
          📤 Upload Receipt
        </Link>
        <Link to="/expenses" style={linkStyle("/expenses")}>
          💰 My Expenses
        </Link>
        <Link to="/report" style={linkStyle("/report")}>
          ⚠️ Report Issue
        </Link>
      </nav>

      {/* ADMIN MENU */}
      {user?.role === "admin" && (
        <>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #e2e8f0",
              margin: "24px 0"
            }}
          />

          <span
            style={{
              color: "#94a3b8",
              fontSize: "11px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px",
              padding: "0 8px"
            }}
          >
            Admin
          </span>

          <nav>
            <Link to="/admin" style={linkStyle("/admin")}>
              🔧 Dashboard
            </Link>
            <Link
              to="/admin/expenses"
              style={linkStyle("/admin/expenses")}
            >
              📋 Manage Expenses
            </Link>
            <Link to="/admin/reports" style={linkStyle("/admin/reports")}>
              📝 Reports
            </Link>
          </nav>
        </>
      )}
    </div>
  );
}

export default Sidebar;