import { useEffect, useState } from "react";
import API from "../services/api";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,Legend
} from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0
  });
  const [recentExpenses, setRecentExpenses] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await API.get("/expenses/stats");
      setStats(res.data);
    };

    const fetchExpenses = async () => {
      const res = await API.get("/expenses");
      setRecentExpenses(res.data.slice(0, 5));
    };

    fetchStats();
    fetchExpenses();
  }, []);

  // Prepare data for charts
  const statusData = [
    { name: "Approved", value: stats.approved },
    { name: "Pending", value: stats.pending },
    { name: "Rejected", value: stats.rejected },
  ].filter(d => d.value > 0);

  // Calculate total amount by status
  const totalAmount = recentExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const approvedAmount = recentExpenses
    .filter(e => e.status === "approved")
    .reduce((sum, e) => sum + (e.amount || 0), 0);

  return (
    <div className="page-container">
      <h2 className="page-title">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-4" style={{ marginBottom: "32px" }}>
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <div className="value">{stats.total}</div>
        </div>
        <div className="stat-card approved">
          <h3>Approved</h3>
          <div className="value">{stats.approved}</div>
        </div>
        <div className="stat-card pending">
          <h3>Pending</h3>
          <div className="value">{stats.pending}</div>
        </div>
        <div className="stat-card rejected">
          <h3>Rejected</h3>
          <div className="value">{stats.rejected}</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-2" style={{ marginBottom: "32px" }}>
        {/* Status Pie Chart */}
        <div className="card">
          <h3 style={{ marginBottom: "20px", color: "#1e293b" }}>My Expenses Status</h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={false}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [value, name]}
                  contentStyle={{ 
                    backgroundColor: "#fff", 
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    color: "#1e293b"
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span style={{ color: "#1e293b" }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ textAlign: "center", color: "#888", padding: "40px" }}>
              No expenses yet. Upload a receipt to get started!
            </p>
          )}
        </div>

        {/* Quick Summary */}
        <div className="card">
          <h3 style={{ marginBottom: "20px", color: "#1e293b" }}>Quick Summary</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={summaryItem}>
              <span style={summaryLabel}>Total Submitted</span>
              <span style={summaryValue}>₹ {totalAmount.toLocaleString()}</span>
            </div>
            <div style={summaryItem}>
              <span style={summaryLabel}>Approved Amount</span>
              <span style={{ ...summaryValue, color: "#10b981" }}>₹ {approvedAmount.toLocaleString()}</span>
            </div>
            <div style={summaryItem}>
              <span style={summaryLabel}>Approval Rate</span>
              <span style={summaryValue}>
                {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="card">
        <h3 style={{ marginBottom: "20px" }}>Recent Expenses</h3>
        {recentExpenses.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentExpenses.map((e) => (
                <tr key={e._id}>
                  <td>{e.vendor}</td>
                  <td>₹ {e.amount?.toLocaleString()}</td>
                  <td>{e.category || "N/A"}</td>
                  <td>
                    <span style={{
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "500",
                      background: e.status === "approved" ? "#d1fae5" : 
                                 e.status === "rejected" ? "#fee2e2" : "#fef3c7",
                      color: e.status === "approved" ? "#065f46" : 
                             e.status === "rejected" ? "#991b1b" : "#92400e"
                    }}>
                      {e.status}
                    </span>
                  </td>
                  <td>{new Date(e.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", color: "#888", padding: "40px" }}>
            No expenses yet. Go to Upload to add your first expense!
          </p>
        )}
      </div>
    </div>
  );
}

const summaryItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  background: "#f8fafc",
  borderRadius: "12px"
};

const summaryLabel = {
  color: "#64748b",
  fontSize: "14px"
};

const summaryValue = {
  color: "#0f172a",
  fontSize: "18px",
  fontWeight: "600"
};

export default Dashboard;