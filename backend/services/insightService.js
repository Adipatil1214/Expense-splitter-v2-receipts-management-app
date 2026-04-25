import Expense from "../models/Expense.js";

export const getInsights = async (req, res) => {
  const userId = req.user.id;

  const total = await Expense.aggregate([
    { $match: { user: userId } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  res.json(total);
};