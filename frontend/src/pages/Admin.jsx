import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {
  const [stats, setStats] = useState({});

  const fetchStats = async () => {
    const res = await API.get("/admin/dashboard");
    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div style={grid}>
        <div style={card}>Total: {stats.total}</div>
        <div style={card}>Approved: {stats.approved}</div>
        <div style={card}>Rejected: {stats.rejected}</div>
        <div style={card}>Pending: {stats.pending}</div>
      </div>
      <h3>Category Breakdown</h3>

      <div style={grid}>
        {stats.categories?.map((c, i) => (
          <div key={i} style={card}>
            {c._id}: {c.count}
          </div>
        ))}
      </div>

      <h3>Recent Expenses</h3>

<table style={{ width: "100%", marginTop: "10px" }}>
  <thead>
    <tr>
      <th>User</th>
      <th>Vendor</th>
      <th>Amount</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody>
    {stats.recent?.map((e) => (
      <tr key={e._id}>
        <td>{e.user?.name}</td>
        <td>{e.vendor}</td>
        <td>₹ {e.amount}</td>
        <td>{e.status}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
};

const card = {
  padding: "20px",
  background: "#f1f1f1",
  borderRadius: "10px",
  textAlign: "center",
};

export default Admin;
