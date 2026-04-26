import Expense from "../models/Expense.js";
import User from "../models/User.js";
import ApprovedVendor from "../models/ApprovedVendor.js";

export const getDashboard = async (req, res) => {
  try {
    const total = await Expense.countDocuments();

    const approved = await Expense.countDocuments({ status: "approved" });
    const rejected = await Expense.countDocuments({ status: "rejected" });
    const pending = await Expense.countDocuments({ status: "pending" });
    const categoryStats = await Expense.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const recent = await Expense.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(5);
    res.json({
      total,
      approved,
      rejected,
      pending,
      categories: categoryStats,
      recent,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📋 Get all expenses
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Approve / Reject
export const updateExpenseStatus = async (req, res) => {
  try {
    const { status, amount, vendor, date } = req.body;

    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { status, amount, vendor, date },
      { new: true },
    );

    res.json(expense);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// 📋 Get all approved vendors
export const getApprovedVendors = async (req, res) => {
  try {
    const vendors = await ApprovedVendor.find().sort({ createdAt: -1 });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➕ Add new approved vendor
export const addApprovedVendor = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Vendor name is required" });
    }

    // Check if vendor already exists
    const existing = await ApprovedVendor.findOne({ name: name.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ error: "Vendor already exists" });
    }

    const vendor = await ApprovedVendor.create({
      name: name.toLowerCase().trim(),
      addedBy: req.user.id
    });

    res.json(vendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑️ Delete approved vendor
export const deleteApprovedVendor = async (req, res) => {
  try {
    await ApprovedVendor.findByIdAndDelete(req.params.id);
    res.json({ message: "Vendor deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑️ Delete expense (ADMIN - can delete any)
export const deleteExpenseAdmin = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};