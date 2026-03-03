const express = require("express");

const router = express.Router();

const {
  getAllExpenses,
  createExpense,
  removeExpense
} = require("../../controllers/expensesController");

router.route("/").get(getAllExpenses).post(createExpense);

router.route("/:id").delete(removeExpense);

module.exports = router;

  