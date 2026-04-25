import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "20px" }}>
      <h3>Menu</h3>

      {/* USER MENU */}
      <nav>
        <Link to="/dashboard">Dashboard</Link><br />
        <Link to="/upload">Upload</Link><br />
        <Link to="/expenses">My Expenses</Link><br />
        <Link to="/report">Report Issue</Link><br />
      </nav>

      {/* ADMIN MENU */}
      {user?.role === "admin" && (
        <>
          <hr />
          <h4>Admin</h4>

          <nav>
            <Link to="/admin">Admin Dashboard</Link><br />
            <Link to="/admin/expenses">Manage Expenses</Link>
          </nav>
        </>
      )}
    </div>
  );
}

export default Sidebar;