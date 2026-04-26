import { useEffect, useState } from "react";
import API from "../services/api";

function Expenses() {
  const [data, setData] = useState([]);

  const fetch = async () => {
    const res = await API.get("/expenses");
    setData(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const deleteExpense = async (id) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;
    try {
      await API.delete(`/expenses/${id}`);
      fetch();
    } catch (err) {
      alert("Failed to delete expense");
    }
  };

 return (
  <div className="page-container">
    <h2 className="page-title">My Expenses</h2>

    {data.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(e => (
            <tr key={e._id}>
              <td>{e.vendor}</td>
              <td>₹ {e.amount}</td>
              <td>{e.category || "N/A"}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
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
              <td>
                <button 
                  onClick={() => deleteExpense(e._id)}
                  style={{ background: "#ef4444", padding: "6px 12px", fontSize: "12px" }}
                >
                  Delete
                </button>
              </td>
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
 );
}

export default Expenses;