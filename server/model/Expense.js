const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      "food",
      "transport",
      "entertainment",
      "utilities",
      "shopping",
      "health",
      "other"
    ]
  },
  amount: {
    type: Number,
    required: true
  },
  payment: {
    type: String,
    required: true,
    enum: ["cash", "credit_card", "debit_card", "upi", "bank_transfer", "other"]
  }
});

module.exports = mongoose.model("Expense", expenseSchema);

/*

Date
description
category - this could be dynamic list
amount
payment



UserId -> above creates a relationship between "Expenses" and "User" collections in MongoDB

*/

