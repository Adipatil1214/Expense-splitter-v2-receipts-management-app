import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <h1>Expense Management System</h1>
      <p>Manage your expenses easily</p>

      <div style={buttons}>
        <button onClick={() => navigate("/login")}>
          Login
        </button>

        <button onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

const container = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const buttons = {
  marginTop: "20px",
  display: "flex",
  gap: "15px",
};

export default Home;