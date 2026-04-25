import mongoose from "mongoose";
import Expense from "../models/Expense.js";
import { extractText } from "../services/ocrService.js";
import { parseReceipt } from "../utils/parser.js";
import { detectCategory } from "../services/categoryService.js";


// 📤 Upload + OCR processing
export const uploadExpense = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imagePath = req.file.path;

    // 🧠 OCR
    const ocrData = await extractText(imagePath);

    const text = ocrData.text;
    const lines = ocrData.lines;

    // 🧾 parse receipt
    const data = parseReceipt(text, lines);

    // 🏷️ category detection
    const category = detectCategory(data.vendor);

    // 💾 save to DB
    const expense = await Expense.create({
      user: req.user.id,
      ...data,
      category,
      imagePath
    });

    res.json(expense);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



// 📋 Get all expenses for logged-in user
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id })
      .sort({ createdAt: -1 }); // newest first

    res.json(expenses);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const stats = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id)
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {
      total: 0,
      approved: 0,
      rejected: 0,
      pending: 0
    };

    stats.forEach(s => {
      result[s._id] = s.count;
      result.total += s.count;
    });

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};