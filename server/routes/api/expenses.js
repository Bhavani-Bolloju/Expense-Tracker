const express = require("express");

const router = express.Router();

const {
  getAllExpenses,
  createExpense,
  removeExpense,
  updateExpense,
  deleteMultipleExpenses
} = require("../../controllers/expensesController");

router.route("/").get(getAllExpenses).post(createExpense);

router.route("/bulk-delete").delete(deleteMultipleExpenses);

router.route("/:id").delete(removeExpense).put(updateExpense);

module.exports = router;

