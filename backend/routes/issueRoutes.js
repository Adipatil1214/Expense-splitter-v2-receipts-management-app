import express from "express";
import { createIssue, getMyIssues } from "../controllers/issueController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createIssue);
router.get("/", protect, getMyIssues);

export default router;