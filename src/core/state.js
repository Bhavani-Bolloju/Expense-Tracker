import { storage } from "../services/storage";

export const dummyData = [
  {
    id: "1aer",
    date: "2025-10-04",
    category: "shopping",
    description: "family festival shopping",
    amount: 150,
    payment: "cash"
  },
  {
    id: "2age",
    date: "2025-09-20",
    category: "movie",
    description: "college friends outing",
    amount: 200,
    payment: "debit"
  },
  {
    id: "3asd",
    date: "2025-11-04",
    category: "Books",
    description: "Amazon books",
    amount: 10,
    payment: "cash"
  },
  {
    id: "4adr",
    date: "2025-10-10",
    category: "Internet Bill",
    description: "Monthly internet bill",
    amount: 50,
    payment: "credit"
  }
];

// export const storedExpensesData = function (data) {
//   const storedExpenses = localStorage.getItem("expensesList");

//   if (!data && !storedExpenses) {
//     localStorage.setItem("expensesList", JSON.stringify(dummyData));
//   } else {
//     if (data) {
//       localStorage.clear();
//       localStorage.setItem("expensesList", JSON.stringify(data));
//     }
//   }

//   return JSON.parse(localStorage.getItem("expensesList"));
// };

export const state = {
  expenses: null,
  updateExpenses: function (expense) {
    this.expenses.push(expense);
    storage.removeExpenses("expenses");
    storage.addExpenses(this.expenses);
  }
};

