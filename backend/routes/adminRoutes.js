import express from "express";
import {
  getDashboard,
  getAllExpenses,
  updateExpenseStatus
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

export default router;