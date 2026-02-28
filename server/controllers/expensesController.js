const Expense = require("../model/Expense");

const getAllExpenses = async (req, res) => {

  try {
    const expenses = await Expense.find({ userId: req.user.userId }).sort({
      date: -1
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

module.exports = { getAllExpenses };

