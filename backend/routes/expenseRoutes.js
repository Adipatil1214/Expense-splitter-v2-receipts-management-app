import express from "express";
import multer from "multer";
import { uploadExpense, getExpenses } from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getStats } from "../controllers/expenseController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

// upload receipt
router.post("/upload", protect, upload.single("receipt"), uploadExpense);
router.get("/stats", protect, getStats);

// get all expenses
router.get("/", protect, getExpenses);

export default router;