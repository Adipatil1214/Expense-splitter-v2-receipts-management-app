import Issue from "../models/Issue.js";

export const createIssue = async (req, res) => {
  try {
    const { subject, description } = req.body;

    const issue = await Issue.create({
      user: req.user.id,
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
    const issues = await Issue.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};