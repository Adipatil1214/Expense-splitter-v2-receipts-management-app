import Issue from "../models/Issue.js";

export const createIssue = async (req, res) => {
  try {
    const { subject, description, expenseId } = req.body;

    const issue = await Issue.create({
      user: req.user.id,
      expenseId: expenseId || null,
      subject,
      description
    });

    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ user: req.user.id })
      .populate("expenseId", "vendor amount date")
      .sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📋 Get all issues (ADMIN ONLY)
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("user", "name email")
      .populate("expenseId", "vendor amount date")
      .sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Resolve issue (ADMIN ONLY)
export const resolveIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status: "resolved" },
      { new: true }
    );
    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};