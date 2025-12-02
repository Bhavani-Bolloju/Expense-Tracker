const expensesContainer = document.querySelector(".expenses_list");
const expenseFormRow = document.querySelector(".fill-expenses-row");
const expenseForm = document.querySelector(".expenseForm");
const addExpenseBtn = document.querySelector(".add-expense");
const submitExpense = document.querySelector(".confirm");
const deleteExpensesBtn = document.querySelector(".delete-expenses");
const selectedItemsCount = document.querySelector(".items-selected");
const selectAllCheckbox = document.querySelector(".select-all");
const btnSortDate = document.querySelector(".btn-sort-date");
const sortAsc = document.querySelector(".sort-asc");
const sortDsc = document.querySelector(".sort-dsc");
const btnClearDateSort = document.querySelector(".btn-clear-date");

export {
  addExpenseBtn,
  expenseForm,
  submitExpense,
  expensesContainer,
  expenseFormRow,
  deleteExpensesBtn,
  selectedItemsCount,
  selectAllCheckbox,
  btnSortDate,
  sortAsc,
  sortDsc,
  btnClearDateSort
};

