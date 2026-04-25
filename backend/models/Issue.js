import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  subject: String,
  description: String,
  status: {
    type: String,
    default: "open"
  }
}, { timestamps: true });

export default mongoose.model("Issue", issueSchema);