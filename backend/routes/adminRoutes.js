import express from "express";
import {
  getDashboard,
  getAllExpenses,
  updateExpenseStatus,
  getApprovedVendors,
  addApprovedVendor,
  deleteApprovedVendor
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// 📊 Admin dashboard
router.get("/dashboard", protect, isAdmin, getDashboard);

// 📋 All expenses (ADMIN ONLY)
router.get("/expenses", protect, isAdmin, getAllExpenses);

// ✅ Approve / Reject (ADMIN ONLY)
router.put("/expenses/:id", protect, isAdmin, updateExpenseStatus);

// 📋 Approved Vendors (ADMIN ONLY)
router.get("/vendors", protect, isAdmin, getApprovedVendors);
router.post("/vendors", protect, isAdmin, addApprovedVendor);
router.delete("/vendors/:id", protect, isAdmin, deleteApprovedVendor);

export default router;