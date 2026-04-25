import { useEffect, useState } from "react";
import API from "../services/api";

function AdminReports() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchReports = async () => {
    const res = await API.get("/issues/all");
    setReports(res.data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const resolveReport = async (id) => {
    await API.put(`/issues/${id}/resolve`);
    fetchReports();
  };

  const filteredReports = filter === "all" 
    ? reports 
    : reports.filter(r => r.status === filter);

  return (
    <div>
      <h2>User Reports</h2>

      {/* Filter Buttons */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("open")}>Open</button>
        <button onClick={() => setFilter("resolved")}>Resolved</button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>User</th>
            <th style={thStyle}>Related Expense</th>
            <th style={thStyle}>Subject</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredReports.map((report) => (
            <tr key={report._id}>
              {/* User Name */}
              <td style={tdStyle}>{report.user?.name || "Unknown"}</td>

              {/* Related Expense */}
              <td style={tdStyle}>
                {report.expenseId ? (
                  <div>
                    <strong>{report.expenseId.vendor}</strong><br />
                    ₹{report.expenseId.amount}
                  </div>
                ) : (
                  <span style={{ color: "#888" }}>No expense linked</span>
                )}
              </td>

              {/* Subject */}
              <td style={tdStyle}>{report.subject}</td>

              {/* Description */}
              <td style={tdStyle}>{report.description}</td>

              {/* Status */}
              <td style={tdStyle}>
                <span style={{ 
                  color: report.status === "open" ? "orange" : "green",
                  fontWeight: "bold"
                }}>
                  {report.status}
                </span>
              </td>

              {/* Date */}
              <td style={tdStyle}>
                {new Date(report.createdAt).toLocaleDateString()}
              </td>

              {/* Action */}
              <td style={tdStyle}>
                {report.status === "open" && (
                  <button onClick={() => resolveReport(report._id)}>
                    Mark Resolved
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredReports.length === 0 && (
        <p style={{ marginTop: "20px" }}>No reports found.</p>
      )}
    </div>
  );
}

const thStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  backgroundColor: "#f5f5f5"
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  verticalAlign: "top"
};

export default AdminReports;