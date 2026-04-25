import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={nav}>
      <h3>Expense System</h3>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 20px",
  background: "#2c3e50",
  color: "white"
};

export default Navbar;