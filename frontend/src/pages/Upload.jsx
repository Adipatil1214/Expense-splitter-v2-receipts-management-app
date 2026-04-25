import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expense, setExpense] = useState(null); // 👈 NEW

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    try {
      setLoading(true);
      toast.info("Processing receipt...");

      const formData = new FormData();
      formData.append("receipt", file);

      const res = await API.post("/expenses/upload", formData);

      setExpense(res.data); // 👈 store response

      toast.success("Uploaded successfully!");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Receipt</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* 👇 RESULT CARD */}
      {expense && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={card}>
            <h3>Extracted Details</h3>

            <p>
              <b>Vendor:</b> {expense.vendor}
            </p>
            <p>
              <b>Category:</b> {expense.category}
            </p>
            <p>
              <b>Amount:</b> ₹ {expense.amount}
            </p>
            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  color:
                    expense.status === "approved"
                      ? "green"
                      : expense.status === "rejected"
                        ? "red"
                        : "orange",
                  fontWeight: "bold",
                }}
              >
                {expense.status}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const card = {
  marginTop: "20px",
  padding: "20px",
  borderRadius: "12px",
  background: "#f9f9f9",
  width: "300px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  textAlign: "left"
};

export default Upload;
