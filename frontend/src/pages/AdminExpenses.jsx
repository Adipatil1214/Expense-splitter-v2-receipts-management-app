import { useEffect, useState } from "react";
import API from "../services/api";

function AdminExpenses() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [filter, setFilter] = useState("pending"); // 👈 default filter
  const [viewImage, setViewImage] = useState(null);
  
  // Vendor management state
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [newVendorName, setNewVendorName] = useState("");
  
  const fetchData = async () => {
    const res = await API.get("/admin/expenses");
    setData(res.data);
  };

  const fetchVendors = async () => {
    const res = await API.get("/admin/vendors");
    setVendors(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (showVendorModal) {
      fetchVendors();
    }
  }, [showVendorModal]);

  const addVendor = async () => {
    if (!newVendorName.trim()) return;
    try {
      await API.post("/admin/vendors", { name: newVendorName });
      setNewVendorName("");
      fetchVendors();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add vendor");
    }
  };

  const deleteVendor = async (id) => {
    if (!confirm("Delete this vendor?")) return;
    try {
      await API.delete(`/admin/vendors/${id}`);
      fetchVendors();
    } catch (err) {
      alert("Failed to delete vendor");
    }
  };

  const updateStatus = async (id, status) => {
    await API.put(`/admin/expenses/${id}`, { status });
    fetchData();
  };

  const handleEdit = (expense) => {
    setEditingId(expense._id);
    setForm({
      vendor: expense.vendor,
      amount: expense.amount,
      date: expense.date.split("T")[0],
      status: expense.status,
    });
  };

  const handleSave = async (id) => {
    await API.put(`/admin/expenses/${id}`, {
      ...form,
      amount: Number(form.amount),
    });

    setEditingId(null);
    fetchData();
  };

  // 🔥 FILTER LOGIC
  const filteredData =
    filter === "all" ? data : data.filter((e) => e.status === filter);

  return (
    <div>
      <h2>Manage Expenses</h2>

      {/* 🔥 FILTER BUTTONS */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("approved")}>Approved</button>
        <button onClick={() => setFilter("rejected")}>Rejected</button>
        <button 
          onClick={() => setShowVendorModal(true)}
          style={{ marginLeft: "20px", backgroundColor: "#4CAF50", color: "white" }}
        >
          + Add Approved Vendor
        </button>
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((e) => (
            <tr key={e._id}>
              {/* USER */}
              <td>{e.user?.name}</td>

              {/* DATE */}
              <td>
                {editingId === e._id ? (
                  <input
                    type="date"
                    value={form.date}
                    onChange={(ev) =>
                      setForm({ ...form, date: ev.target.value })
                    }
                  />
                ) : (
                  new Date(e.date).toLocaleDateString()
                )}
              </td>

              {/* VENDOR */}
              <td>
                {editingId === e._id ? (
                  <input
                    value={form.vendor}
                    onChange={(ev) =>
                      setForm({ ...form, vendor: ev.target.value })
                    }
                  />
                ) : (
                  e.vendor
                )}
              </td>

              {/* AMOUNT */}
              <td>
                {editingId === e._id ? (
                  <input
                    type="number"
                    value={form.amount}
                    onChange={(ev) =>
                      setForm({ ...form, amount: ev.target.value })
                    }
                  />
                ) : (
                  `₹ ${e.amount}`
                )}
              </td>

              {/* STATUS */}
              <td
                style={{
                  color:
                    e.status === "approved"
                      ? "green"
                      : e.status === "rejected"
                        ? "red"
                        : "orange",
                  fontWeight: "bold",
                }}
              >
                {editingId === e._id ? (
                  <select
                    value={form.status}
                    onChange={(ev) =>
                      setForm({ ...form, status: ev.target.value })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                ) : (
                  e.status
                )}
              </td>

              {/* ACTIONS */}
              <td>
                {editingId === e._id ? (
                  <>
                    <button onClick={() => handleSave(e._id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(e)}>Edit</button>
                    <button onClick={() => updateStatus(e._id, "approved")}>
                      ✔
                    </button>
                    <button onClick={() => updateStatus(e._id, "rejected")}>
                      ✖
                    </button>
                    <button
                      onClick={() =>
                        setViewImage(e.imagePath.replace(/\\/g, "/"))
                      }
                    >
                      View
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* viewing file  */}
      {viewImage && (
  <div style={overlay} onClick={() => setViewImage(null)}>
    
    <div style={modal} onClick={(e) => e.stopPropagation()}>
      
      <img
        src={`http://localhost:5000/${viewImage}`}
        alt="receipt"
        style={{ maxWidth: "500px", borderRadius: "10px" }}
      />

      <br /><br />

      <button onClick={() => setViewImage(null)}>
        Close
      </button>

    </div>

  </div>
)}

      {/* Vendor Management Modal */}
      {showVendorModal && (
        <div style={overlay} onClick={() => setShowVendorModal(false)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <h3>Manage Approved Vendors</h3>
            
            {/* Add new vendor */}
            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Enter vendor name"
                value={newVendorName}
                onChange={(e) => setNewVendorName(e.target.value)}
                style={{ padding: "8px", marginRight: "10px" }}
              />
              <button onClick={addVendor}>Add</button>
            </div>
            
            {/* Vendor list */}
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "5px" }}>Vendor Name</th>
                    <th style={{ textAlign: "right", padding: "5px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((v) => (
                    <tr key={v._id}>
                      <td style={{ padding: "5px" }}>{v.name}</td>
                      <td style={{ textAlign: "right", padding: "5px" }}>
                        <button 
                          onClick={() => deleteVendor(v._id)}
                          style={{ backgroundColor: "#ff4444", color: "white" }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {vendors.length === 0 && <p>No approved vendors yet.</p>}
            </div>
            
            <br /><br />
            <button onClick={() => setShowVendorModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

const table = {
  width: "100%",
  borderCollapse: "collapse",
};
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000
};

const modal = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center"
};
export default AdminExpenses;
