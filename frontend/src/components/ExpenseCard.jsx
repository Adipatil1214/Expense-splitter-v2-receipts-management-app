function ExpenseCard({ expense, isAdmin, onUpdate }) {
  return (
    <div style={card}>
      <h3>{expense.vendor}</h3>

      <p>₹ {expense.amount}</p>
      <p>Category: {expense.category}</p>
      <p>User: {expense.user?.email}</p>

      <p>
        Status:{" "}
        <span
          style={{
            color:
              expense.status === "approved"
                ? "green"
                : expense.status === "rejected"
                ? "red"
                : "orange",
            fontWeight: "bold"
          }}
        >
          {expense.status}
        </span>
      </p>

      {/* Admin buttons */}
      {isAdmin && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => onUpdate(expense._id, "approved")}>
            Approve
          </button>

          <button onClick={() => onUpdate(expense._id, "rejected")}>
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

const card = {
  border: "1px solid #ccc",
  padding: "15px",
  borderRadius: "10px",
  margin: "10px 0",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
};

export default ExpenseCard;