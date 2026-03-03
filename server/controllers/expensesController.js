const Expense = require("../model/Expense");

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId }).sort({
      date: 1
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

const createExpense = async (req, res) => {
  try {
    const userId = req.userId;
    const expense = { ...req.body, userId };
    await Expense.create(expense);

    res.status(200).json({ success: "new expense created" });
  } catch (error) {
    console.log(error, "error during create expense");
  }
};

const removeExpense = async (req, res) => {
  try {
    const id = req.params.id;
    await Expense.findOneAndDelete({ _id: id }).exec();

    res.json({ message: "expense deleted successfully" });
  } catch (error) {
    console.log(error, "error deleting the expense");
  }
};

module.exports = { getAllExpenses, createExpense, removeExpense };

