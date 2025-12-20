import {
  expensesContainer,
  selectAllCheckbox,
  btnClearDateSort,
  addExpenseBtn,
  btnClearAmountSort,
  selectFilterCategory,
  inputSearchEl
} from "../UI/elements";
import { nanoid } from "nanoid";
import {
  removeNewFormElement,
  renderNewExpense,
  toggleMultiSelect,
  renderExpenses,
  clearAmountSortingIndicators,
  clearDateSortingIndicators
} from "../UI/render";

import { state } from "../core/state";

import {
  toggleEditExpense,
  createNewFormElement,
  updateSavedExpense,
  renumberRows,
  updateTotalPages,
  updateCurrentPage
} from "../UI/render";

import { addNewExpenseFormTemplate } from "../UI/templates";

import { pagination } from "../services/pagination";

import { tableStateManager } from "../services/tableStateManager";

// import { expensesItems } from "../core/expensesItems";

export const handleAddExpense = function (e) {
  expensesContainer.insertAdjacentHTML(
    "afterbegin",
    addNewExpenseFormTemplate()
  );

  const formRow = expensesContainer
    .querySelector(".fill-expenses-row")
    .querySelector(".input_date");

  formRow.focus();

  addExpenseBtn.disabled = true;
};

export const handleSubmitForm = function (e) {
  e.preventDefault();

  // console.log(e);
  const formData = new FormData(e.target);

  const inputData = Object.fromEntries(formData.entries());
  const newExpense = { ...inputData, id: nanoid(4) };

  //update UI
  renderNewExpense(newExpense, state.expenses.length + 1);

  //update state
  state.updateExpenses(newExpense);

  renumberRows();

  //remove form
  const formRow = expensesContainer.querySelector(".fill-expenses-row");
  formRow.remove();

  //enable add expense btn
  addExpenseBtn.disabled = false;
};

export const handleCancelAddExpense = function (e) {
  // console.log(e.target);
  e.stopPropagation();

  const btnCancel = e.target.classList.contains("cancel_addExpense");
  if (!btnCancel) return;

  //remove form
  const formRow = expensesContainer.querySelector(".fill-expenses-row");
  formRow.remove();

  //enable add expense btn
  addExpenseBtn.disabled = false;
};

export const handleEditExpense = function (e) {
  //switch the state from static to edit mode make changes to the UI

  const isBtnEdit = e.target.classList.contains("btn_edit");

  if (!isBtnEdit) return;

  const row = e.target.closest("tr");
  const rowId = row.dataset.id;

  //update the UI
  toggleEditExpense(rowId);

  //create newFormEl
  createNewFormElement(rowId);
};

export const handleSubmitEditExpense = function (e) {
  if (e.target.tagName !== "FORM") return;

  e.preventDefault();

  const form = e.target;
  const formId = form.dataset.formId;

  //get form data

  const formData = new FormData(form);
  const inputData = Object.fromEntries(formData.entries());

  //update UI
  updateSavedExpense(formId, inputData);

  //update storage
  state.updateEditedExpense(formId, inputData);
};

export const handleCancelEdit = function (e) {
  const isBtnEdit = e.target.classList.contains("btn_cancel");

  if (!isBtnEdit) return;

  const row = e.target.closest("tr");
  const rowId = row.dataset.id;

  removeNewFormElement(rowId);
  toggleEditExpense(rowId);
};

export const handleDeleteExpense = function (e) {
  const isBtnDelete = e.target.classList.contains("btn_delete");

  if (!isBtnDelete) return;

  const row = e.target.closest("tr");

  //update expenses
  state.removeExpense(row.dataset.id);

  renumberRows();

  const pageItems = pagination.getPageItems(state.expenses);

  // expensesItems.updateItems(pageItems);

  // const items = expensesItems.deleteItemUpdate(expensesItems.items);
  // state.expenses = items;
  renderExpenses(items);
};

export const handleSelectAllExpenses = function (e) {
  const isChecked = e.target.checked;
  const rows = expensesContainer.querySelectorAll(".expense-item");

  rows.forEach((row) => {
    const inputCheckbox = row.querySelector("input[type='checkbox']");

    if (inputCheckbox) {
      inputCheckbox.checked = isChecked;
    }

    if (inputCheckbox) {
      isChecked
        ? row.classList.add("bg-gray-50")
        : row.classList.remove("bg-gray-50");
    }
  });

  if (isChecked) {
    toggleMultiSelect(rows.length);
  } else {
    toggleMultiSelect(0);
  }
};

let count = 0;
export const handleMultiSelectExpenses = function (e) {
  // const isCheckbox =

  if (e.target.tagName !== "INPUT") return;

  const rows = this.querySelectorAll(".expense-item");

  count = 0;

  rows.forEach((item) => {
    const checkBox = item.querySelector('input[type="checkbox"]');
    if (checkBox) {
      if (!checkBox.checked) {
        item.classList.remove("bg-gray-100");
      } else {
        count++;
        item.classList.add("bg-gray-100");
      }
    }
  });

  if (count >= 1) {
    //hide add expense and display delete
    toggleMultiSelect(count);
  } else {
    //hide add expense and display delete
    toggleMultiSelect(count);
  }

  if (count === rows.length) {
    selectAllCheckbox.checked = true;
  } else {
    selectAllCheckbox.checked = false;
  }
};

export const handleMultiSelectedExpensesDelete = function (e) {
  //get all the items -> remove those that are have checked on them
  const rows = expensesContainer.querySelectorAll("tr");

  const deleteIds = new Set();

  rows.forEach((row) => {
    const checkbox = row.querySelector("input[type='checkbox']");

    if (checkbox && checkbox.checked) {
      const id = checkbox.dataset.check;
      row.remove();
      deleteIds.add(id);
    }
  });

  //remove all the items from the state
  state.removeMultipleExpenses(deleteIds);
  selectAllCheckbox.checked = false;

  //fix the row numbers
  renumberRows();

  //uncheck select all -> remove display of total selected items, display add expenses btn
  toggleMultiSelect(0);
};

export const handleSortingDate = function (e) {
  //clear amount sorting
  clearAmountSortingIndicators();

  const btnSortDate = e.target.closest(".btn-sort-date");
  const sortAsc = btnSortDate.querySelector(".sort-asc");
  const sortDsc = btnSortDate.querySelector(".sort-dsc");

  if (tableStateManager.dateSort === "none") {
    tableStateManager.setDateSort("asc");
  }

  const expenses = pagination.getPageItems(state.expenses);

  const items = tableStateManager.getProcessedItems(expenses);

  if (tableStateManager.dateSort === "asc") {
    sortAsc.classList.add("text-blue-500");
    sortDsc.classList.remove("text-blue-500");
    tableStateManager.setDateSort("dsc");
  } else {
    sortAsc.classList.remove("text-blue-500");
    sortDsc.classList.add("text-blue-500");
    tableStateManager.setDateSort("asc");
  }

  btnClearDateSort.classList.remove("hidden");

  renderExpenses(items);
  renumberRows();
};

export const handleSortingAmount = function (e) {
  clearDateSortingIndicators();

  const btnSortAmount = e.target.closest(".btn-sort-amount");

  const sortAsc = btnSortAmount.querySelector(".sort-asc");
  const sortDsc = btnSortAmount.querySelector(".sort-dsc");

  if (tableStateManager.amountSort === "none") {
    tableStateManager.setAmountSort("asc");
  }

  const expenses = pagination.getPageItems(state.expenses);
  const items = tableStateManager.getProcessedItems(expenses);

  if (tableStateManager.amountSort === "asc") {
    sortAsc.classList.add("text-blue-500");
    sortDsc.classList.remove("text-blue-500");
    tableStateManager.setAmountSort("dsc");
  } else {
    sortAsc.classList.remove("text-blue-500");
    sortDsc.classList.add("text-blue-500");
    tableStateManager.setAmountSort("asc");
  }

  btnClearAmountSort.classList.remove("hidden");

  renderExpenses(items);
  renumberRows();
};

export const handleClearSorting = function (e) {
  const row = e.target.closest("th");
  const sortAsc = row.querySelector(".sort-asc");
  const sortDsc = row.querySelector(".sort-dsc");

  row.querySelector(".clear-sort").classList.add("hidden");
  sortAsc.classList.remove("text-blue-500");
  sortDsc.classList.remove("text-blue-500");

  const expenses = pagination.getPageItems(state.expenses);

  tableStateManager.setDateSort("none");
  tableStateManager.setAmountSort("none");

  const items = tableStateManager.getProcessedItems(expenses);

  renderExpenses(items);

  renumberRows();
};

export const handleFilterCategory = function (e) {
  // console.log(e.target.value, 'selected category');
  const selectedType = e.target.value;

  const expenses = pagination.getPageItems(state.expenses);

  tableStateManager.setCategoryFilter(selectedType);

  const items = tableStateManager.getProcessedItems(expenses);

  renderExpenses(items);
  clearAmountSortingIndicators();
  clearDateSortingIndicators();
};

export const handleSearchWithKeywords = function (e) {
  const keyword = e.target.value;

  const expenses = pagination.getPageItems(state.expenses);

  tableStateManager.setSearchKeyword(keyword);

  const items = tableStateManager.getProcessedItems(expenses);

  renderExpenses(items);
};

export const handleNextPage = function () {
  pagination.nextPage();

  const expenseItems = pagination.getPageItems(state.expenses);

  updateTotalPages(pagination.totalPageCount);
  updateCurrentPage(pagination.currentPage);

  clearAmountSortingIndicators();
  clearDateSortingIndicators();

  tableStateManager.clearFilters();

  renderExpenses(expenseItems);
  renumberRows();
};

export const handlePrevPage = function () {
  pagination.prevPage();

  const expenseItems = pagination.getPageItems(state.expenses);

  updateTotalPages(pagination.totalPageCount);
  updateCurrentPage(pagination.currentPage);

  clearAmountSortingIndicators();
  clearDateSortingIndicators();

  tableStateManager.clearFilters();

  renderExpenses(expenseItems);
  renumberRows();
};

//btn-clear-amount

/*

filter by category
search bar for keywords (highlight matches) 

light/dark mode toggling
pagination

*/

/*
- rest API
- logic form - accessibility

basic react
- refer to the libraries

*/

