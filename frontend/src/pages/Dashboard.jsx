import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await API.get("/expenses/stats");
      setStats(res.data);
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: "20px" }}>

        <div style={card}>
          <h3>Total</h3>
          <p>{stats.total}</p>
        </div>

        <div style={card}>
          <h3>Approved</h3>
          <p>{stats.approved}</p>
        </div>

        <div style={card}>
          <h3>Rejected</h3>
          <p>{stats.rejected}</p>
        </div>

        <div style={card}>
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>

      </div>
    </div>
  );
}

const card = {
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  minWidth: "120px",
  textAlign: "center"
};

export default Dashboard;