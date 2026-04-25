import mongoose from 'mongoose';

const approvedVendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true   // store lowercase so comparison is case-insensitive
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'       // the admin who approved/added this vendor
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("ApprovedVendor", approvedVendorSchema);
