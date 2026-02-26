const express = require("express");

const router = express.Router();

const { getAllExpenses } = require("../../controllers/expensesController");

router.route("/").get(getAllExpenses);

module.exports = router;

