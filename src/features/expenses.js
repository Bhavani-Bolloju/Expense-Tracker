import { expenseFormRow, expensesContainer } from "../UI/elements";
import { nanoid } from "nanoid";
import {
  removeNewFormElement,
  renderNewExpense,
  renderExpenses
} from "../UI/render";

import { state } from "../core/state";

import {
  toggleEditExpense,
  createNewFormElement,
  updateSavedExpense
} from "../UI/render";

// export const getFormData = function (form) {
//   if (!form.checkValidity()) {
//     form.reportValidity();
//     return;
//   }
//   const formData = new FormData(form);

//   const inputData = Object.fromEntries(formData.entries());

//   return inputData;
// };

export const handleAddExpense = function () {
  expenseFormRow.classList.toggle("hidden");
};

export const handleSubmitForm = function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const inputData = Object.fromEntries(formData.entries());
  const newExpense = { ...inputData, id: nanoid(4) };

  //update UI
  renderNewExpense(newExpense, state.expenses.length + 1);

  //update state
  state.updateExpenses(newExpense);

  //reset form
  e.target.reset();

  //hide form
  handleAddExpense();
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
  // row.remove();

  //update expenses
  state.removeExpense(row.dataset.id);

  //render all elements
  expensesContainer.innerHTML = "";
  renderExpenses(state.expenses);
};

