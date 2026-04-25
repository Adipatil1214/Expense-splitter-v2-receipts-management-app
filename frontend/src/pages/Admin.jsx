import { useEffect, useState } from "react";
import API from "../services/api";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend 
} from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

function Admin() {
  const [stats, setStats] = useState({});
  const [recentExpenses, setRecentExpenses] = useState([]);

  const fetchStats = async () => {
    const res = await API.get("/admin/dashboard");
    setStats(res.data);
  };

  const fetchRecent = async () => {
    const res = await API.get("/admin/expenses");
    setRecentExpenses(res.data.slice(0, 10));
  };

  useEffect(() => {
    fetchStats();
    fetchRecent();
  }, []);

  // Prepare pie chart data
  const statusData = [
    { name: "Approved", value: stats.approved || 0 },
    { name: "Pending", value: stats.pending || 0 },
    { name: "Rejected", value: stats.rejected || 0 },
  ];

  // Prepare category chart data
  const categoryData = stats.categories?.map(c => ({
    name: c._id || "Uncategorized",
    count: c.count
  })) || [];

  return (
    <div className="page-container">
      <h2 className="page-title">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-4" style={{ marginBottom: "32px" }}>
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <div className="value">{stats.total || 0}</div>
        </div>
        <div className="stat-card approved">
          <h3>Approved</h3>
          <div className="value">{stats.approved || 0}</div>
        </div>
        <div className="stat-card pending">
          <h3>Pending</h3>
          <div className="value">{stats.pending || 0}</div>
        </div>
        <div className="stat-card rejected">
          <h3>Rejected</h3>
          <div className="value">{stats.rejected || 0}</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-2" style={{ marginBottom: "32px" }}>
        {/* Status Pie Chart */}
        <div className="card">
          <h3 style={{ marginBottom: "20px", color: "#1e293b" }}>Expense Status Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={false}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index + 1]} />
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
        </div>

        {/* Category Bar Chart */}
        <div className="card">
          <h3 style={{ marginBottom: "20px" }}>Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Expenses Table */}
      <div className="card">
        <h3 style={{ marginBottom: "20px" }}>Recent Expenses</h3>
        <table>
          <thead>
            <tr>
              <th>User</th>
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
                <td>{e.user?.name || "Unknown"}</td>
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
      </div>
    </div>
  );
}

export default Admin;
