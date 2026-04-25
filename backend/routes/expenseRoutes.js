import express from "express";
import { uploadExpense, getExpenses, getStats } from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// upload receipt
router.post("/upload", protect, upload.single("receipt"), uploadExpense);
router.get("/stats", protect, getStats);

// get all expenses
router.get("/", protect, getExpenses);

export default router;