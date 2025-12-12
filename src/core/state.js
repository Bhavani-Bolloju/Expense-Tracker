import { storage } from "../services/storage";

// export const dummyData = [
//   {
//     id: "1aer",
//     date: "2025-10-04",
//     category: "shopping",
//     description: "family festival shopping",
//     amount: 150,
//     payment: "cash"
//   },
//   {
//     id: "2age",
//     date: "2025-09-20",
//     category: "movie",
//     description: "college friends outing",
//     amount: 200,
//     payment: "debit"
//   },
//   {
//     id: "3asd",
//     date: "2025-11-04",
//     category: "Books",
//     description: "Amazon books",
//     amount: 10,
//     payment: "cash"
//   },
//   {
//     id: "4adr",
//     date: "2025-10-10",
//     category: "Internet Bill",
//     description: "Monthly internet bill",
//     amount: 50,
//     payment: "credit"
//   }
// ];

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

export const dummyData = [
  {
    id: "1aer",
    date: "2025-02-04",
    category: "shopping",
    description: "family festival shopping",
    amount: 150,
    payment: "cash"
  },
  {
    id: "2bdx",
    date: "2025-10-06",
    category: "groceries",
    description: "weekly grocery run",
    amount: 82,
    payment: "upi"
  },
  {
    id: "3kpl",
    date: "2025-04-08",
    category: "transport",
    description: "cab to office",
    amount: 18,
    payment: "card"
  },
  {
    id: "4msq",
    date: "2025-08-09",
    category: "food",
    description: "lunch at restaurant",
    amount: 26,
    payment: "cash"
  },
  {
    id: "5ztu",
    date: "2025-05-10",
    category: "entertainment",
    description: "movie tickets",
    amount: 32,
    payment: "card"
  },
  {
    id: "6wen",
    date: "2025-09-11",
    category: "health",
    description: "pharmacy purchase",
    amount: 14,
    payment: "upi"
  },
  {
    id: "7qaz",
    date: "2025-10-08",
    category: "utilities",
    description: "electricity bill payment",
    amount: 90,
    payment: "upi"
  },
  {
    id: "8nmk",
    date: "2025-11-12",
    category: "subscriptions",
    description: "netflix monthly",
    amount: 15,
    payment: "card"
  },
  {
    id: "9poc",
    date: "2025-12-01",
    category: "fuel",
    description: "car fuel refill",
    amount: 55,
    payment: "cash"
  },
  {
    id: "10rty",
    date: "2025-11-15",
    category: "food",
    description: "coffee and snacks",
    amount: 12,
    payment: "card"
  },
  {
    id: "11lmn",
    date: "2025-10-16",
    category: "shopping",
    description: "clothes purchase",
    amount: 120,
    payment: "upi"
  },
  {
    id: "12bvc",
    date: "2025-10-17",
    category: "groceries",
    description: "vegetables and fruits",
    amount: 34,
    payment: "cash"
  },
  {
    id: "13asw",
    date: "2025-02-18",
    category: "transport",
    description: "metro card top-up",
    amount: 25,
    payment: "upi"
  },
  {
    id: "14ujm",
    date: "2025-12-10",
    category: "fitness",
    description: "gym membership renewal",
    amount: 60,
    payment: "card"
  },
  {
    id: "15cxz",
    date: "2025-06-20",
    category: "entertainment",
    description: "game purchase",
    amount: 45,
    payment: "upi"
  },
  {
    id: "16plo",
    date: "2025-10-21",
    category: "health",
    description: "doctor consultation",
    amount: 75,
    payment: "cash"
  },
  {
    id: "17ghj",
    date: "2025-12-22",
    category: "subscriptions",
    description: "spotify premium",
    amount: 10,
    payment: "card"
  },
  {
    id: "18vfr",
    date: "2025-10-23",
    category: "shopping",
    description: "kitchen accessories",
    amount: 40,
    payment: "upi"
  },
  {
    id: "19edc",
    date: "2025-06-24",
    category: "food",
    description: "dinner with friends",
    amount: 48,
    payment: "card"
  },
  {
    id: "20nhb",
    date: "2025-10-25",
    category: "transport",
    description: "bus pass recharge",
    amount: 20,
    payment: "upi"
  },
  {
    id: "21mju",
    date: "2025-03-26",
    category: "groceries",
    description: "monthly groceries",
    amount: 135,
    payment: "card"
  },
  {
    id: "22wsx",
    date: "2025-10-26",
    category: "utilities",
    description: "water bill",
    amount: 28,
    payment: "upi"
  },
  {
    id: "23qwe",
    date: "2025-10-27",
    category: "fuel",
    description: "bike petrol",
    amount: 14,
    payment: "cash"
  },
  {
    id: "24zxc",
    date: "2025-05-28",
    category: "gifts",
    description: "birthday gift for friend",
    amount: 52,
    payment: "card"
  },
  {
    id: "25tgb",
    date: "2025-01-29",
    category: "maintenance",
    description: "home cleaning service",
    amount: 85,
    payment: "upi"
  }
];

export const state = {
  expenses: null,
  updateExpenses: function (expense) {
    this.expenses.unshift(expense);
    storage.removeExpenses("expenses");
    storage.addExpenses(this.expenses);
  },
  updateEditedExpense: function (id, newExpense) {
    const index = this.expenses.findIndex((item) => item.id === id);
    const item = this.expenses[index];
    const updatedExpense = { ...item, ...newExpense };
    this.expenses[index] = updatedExpense;

    storage.addExpenses(this.expenses);
  },

  removeExpense: function (id) {
    this.expenses = this.expenses.filter((item) => item.id !== id);
    // storage.addExpenses(this.expenses);
  },

  removeMultipleExpenses: function (ids) {
    this.expenses = this.expenses.filter((item) => !ids.has(item.id));
    storage.addExpenses(this.expenses);
  }
};

