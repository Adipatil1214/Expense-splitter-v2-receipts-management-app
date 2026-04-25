import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  expenseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expense"
  },
  subject: String,
  description: String,
  status: {
    type: String,
    enum: ["open", "resolved"],
    default: "open"
  }
}, { timestamps: true });

export default mongoose.model("Issue", issueSchema);