const Expense = require("../model/Expense");

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId }).sort({
      createdAt: -1
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

const createExpense = async (req, res) => {
  try {
    const userId = req.userId;
    const data = { ...req.body, userId };
    const expense = await Expense.create(data);

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: "Failed to create new expense" });
  }
};

const removeExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expense.findOneAndDelete({ _id: id }).exec();

    if (!expense) return res.status(404).json({ error: "Not found" });

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
};

const updateExpense = async (req, res) => {
  const { category, description, amount, payment, date } = req.body;
  const id = req.params.id;
  
  
  console.log(id, "expense id to be udpated")

  try {
    const expense = await Expense.findOne({ _id: id }).exec();

    if (!expense) return res.status(404).json({ error: "Not found" });

    expense.category = category;
    expense.description = description;
    expense.amount = amount;
    expense.date = date;
    expense.payment = payment;

    const newExpense = await expense.save();

    return res.json({ expense: newExpense });
  } catch (error) {
    res.status(500).json({ error: "Failed to update expense" });
  }
};

const deleteMultipleExpenses = async (req, res) => {
  const ids = req.body;
  try {
    const req = await Expense.deleteMany({ _id: { $in: ids } });

    if (!req) return res.status(404).json({ error: "Not found" });

    res.json({ message: `Deleted ${req.deletedCount} expenses` });
  } catch (error) {
    res.status(500).json({ error: "Failed to update expenses" });
  }
};

module.exports = {
  getAllExpenses,
  createExpense,
  removeExpense,
  updateExpense,
  deleteMultipleExpenses
};

