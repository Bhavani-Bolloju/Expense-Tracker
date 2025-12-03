import {
  expensesContainer,
  selectAllCheckbox,
  btnClearDateSort,
  addExpenseBtn
} from "../UI/elements";
import { nanoid } from "nanoid";
import {
  removeNewFormElement,
  renderNewExpense,
  toggleMultiSelect,
  renderExpenses
} from "../UI/render";

import { state } from "../core/state";

import {
  toggleEditExpense,
  createNewFormElement,
  updateSavedExpense,
  renumberRows
} from "../UI/render";

import { storage } from "../services/storage";
import { addNewExpenseFormTemplate } from "../UI/templates";

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
  // e.stopPropagation();

  // console.log(e);
  const formData = new FormData(e.target);

  const inputData = Object.fromEntries(formData.entries());
  const newExpense = { ...inputData, id: nanoid(4) };

  //update UI
  renderNewExpense(newExpense, state.expenses.length + 1);

  //update state
  state.updateExpenses(newExpense);

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
  row.remove();

  //update expenses
  state.removeExpense(row.dataset.id);

  //update row serial number
  const rowNum = row.querySelector(".rowNum");
  renumberRows(rowNum);
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

let orderDate = "asc";

export const handleSortingDate = function (e) {
  const btnSortDate = e.target.closest(".btn-sort-date");

  const sortAsc = btnSortDate.querySelector(".sort-asc");
  const sortDsc = btnSortDate.querySelector(".sort-dsc");

  let expenses = state.expenses;

  if (orderDate === "asc") {
    // expenses = expenses.sort((a, b) => a.date - b.date);
    expenses.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    //update orderDate variable
    orderDate = "dsc";

    //style the button -> asc order to reflect which order being displayed
    sortAsc.classList.add("text-blue-500");
    sortDsc.classList.remove("text-blue-500");
  } else {
    expenses.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    orderDate = "asc";

    sortAsc.classList.remove("text-blue-500");
    sortDsc.classList.add("text-blue-500");
  }
  //render the list
  btnClearDateSort.classList.remove("hidden");
  renderExpenses(expenses);
};

export const handleClearSorting = function (e) {
  const row = e.target.closest(".col-date");
  const sortAsc = row.querySelector(".sort-asc");
  const sortDsc = row.querySelector(".sort-dsc");

  //clear the sorting order
  state.expenses = storage.loadExpenses();

  renderExpenses(state.expenses);

  btnClearDateSort.classList.add("hidden");
  sortAsc.classList.remove("text-blue-500");
  sortDsc.classList.remove("text-blue-500");
};

/*
sorting date and amount

clear date sorting feature
implement sort by amount

filter by category
search bar for keywords (highlight matches)

light/dark mode toggling
pagination




*/

