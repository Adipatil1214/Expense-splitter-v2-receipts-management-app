import express from "express";
import { createIssue, getMyIssues, getAllIssues, resolveIssue } from "../controllers/issueController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// User routes
router.post("/", protect, createIssue);
router.get("/", protect, getMyIssues);

// Admin routes
router.get("/all", protect, isAdmin, getAllIssues);
router.put("/:id/resolve", protect, isAdmin, resolveIssue);

export default router;