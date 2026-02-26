const expensesContainer = document.querySelector(".expenses_list");
const expenseFormRow = document.querySelector(".fill-expenses-row");
const expenseForm = document.querySelector(".expenseForm");
const addExpenseBtn = document.querySelector(".add-expense");
const submitExpense = document.querySelector(".confirm");
const deleteExpensesBtn = document.querySelector(".delete-expenses");
const selectedItemsCount = document.querySelector(".items-selected");
const selectAllCheckbox = document.querySelector(".select-all");
const btnSortDate = document.querySelector(".btn-sort-date");
const btnSortAmount = document.querySelector(".btn-sort-amount");

const btnClearDateSort = document.querySelector(".btn-clear-date");

const btnClearAmountSort = document.querySelector(".btn-clear-amount");

const selectFilterCategory = document.querySelector(".filter-category");

const inputSearchEl = document.querySelector(".input_search");

const btnNextEl = document.querySelector(".btn_next");
const btnPrevEl = document.querySelector(".btn_prev");

const currPageEl = document.querySelector(".currPage_num");
const totalPagesEl = document.querySelector(".total_pages");

const btnLogout = document.querySelector(".btn_logout");

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
  btnSortAmount,
  btnClearDateSort,
  btnClearAmountSort,
  selectFilterCategory,
  inputSearchEl,
  btnNextEl,
  btnPrevEl,
  currPageEl,
  totalPagesEl,
  btnLogout
};

