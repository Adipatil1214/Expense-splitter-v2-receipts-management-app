import { useState, useEffect } from "react";
import API from "../services/api";

function Report() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await API.get("/expenses");
      setExpenses(res.data);
    };
    fetchExpenses();
  }, []);

  const handleSubmit = async () => {
    if (!subject || !description) {
      alert("Please fill in subject and description");
      return;
    }

    await API.post("/issues", { 
      subject, 
      description,
      expenseId: selectedExpense || null
    });

    alert("Issue submitted");
    setSubject("");
    setDescription("");
    setSelectedExpense("");
  };

  return (
    <div >
      <h2>Report Issue</h2>

      {/* Expense Picker - Optional */}
      <div style={{ marginBottom: "15px", }}>
        <label>Related Expense (optional): </label>
        <select 
          value={selectedExpense} 
          onChange={e => setSelectedExpense(e.target.value)}
          style={{ padding: "8px", marginLeft: "10px" }}
        >
          <option value="">-- Select an expense --</option>
          {expenses.map(exp => (
            <option key={exp._id} value={exp._id}>
              {exp.vendor} - ₹{exp.amount} - {new Date(exp.date).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      <input
        placeholder="Subject"
        value={subject}
        onChange={e => setSubject(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <br />

      <textarea
        placeholder="Describe your issue"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ width: "100%", height: "100px", padding: "8px", marginBottom: "10px" }}
      />

      <br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Report;