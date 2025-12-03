import { expenseTemplate } from "./templates";
import {
  expensesContainer,
  addExpenseBtn,
  deleteExpensesBtn,
  selectedItemsCount,
  btnClearAmountSort,
  btnClearDateSort
} from "./elements";
import { formatDate } from "../utils/format";

export function renderExpenses(expenses) {
  const list = expenses
    ?.map((item, index) => {
      return expenseTemplate(item, index + 1);
    })
    .join("");

  //empty the container
  expensesContainer.innerHTML = "";
  expensesContainer.insertAdjacentHTML("beforeend", list);
}

export function renderNewExpense(expense, rowId) {
  const row = expenseTemplate(expense, rowId);
  expensesContainer.insertAdjacentHTML("beforeend", row);
}

export function toggleEditExpense(rowId) {
  // console.log(row, "el edit");
  const row = document.querySelector(`.item-${rowId}`);
  row.classList.toggle("edit");
  row.classList.toggle("static");
}

export function createNewFormElement(rowId) {
  const newForm = document.createElement("form");
  newForm.setAttribute("id", `edit_form-${rowId}`);
  newForm.dataset.formId = rowId;
  expensesContainer.prepend(newForm);
}

export function removeNewFormElement(rowId) {
  const formEl = document.querySelector(`#edit_form-${rowId}`);
  formEl.remove();
}

export function updateSavedExpense(rowId, inputData) {
  const row = document.querySelector(`.item-${rowId}`);

  //get elements
  const dateInputEL = row?.querySelector(".date_value");
  const categoryInputEl = row?.querySelector(".category_value");
  const descriptionInputEl = row?.querySelector(".description_value");
  const amountInputEl = row?.querySelector(".amount_value");
  const paymentInputEl = row?.querySelector(".payment_value");

  //update DOM
  dateInputEL.innerHTML = formatDate(inputData.date);
  categoryInputEl.innerHTML = inputData.category;
  descriptionInputEl.innerHTML = inputData.description;
  amountInputEl.innerHTML = inputData.amount;
  paymentInputEl.innerHTML = inputData.payment;

  //switch to the static mode
  toggleEditExpense(rowId);

  //delete the form element
  removeNewFormElement(rowId);
}

export function renumberRows() {
  const rows = expensesContainer.querySelectorAll(".expense-item");

  rows.forEach((row, i) => {
    const rowSerial = row.querySelector(".rowNum");

    if (rowSerial && rowSerial.textContent !== i + 1) {
      rowSerial.textContent = i + 1;
    }
  });
}

export function toggleMultiSelect(count) {
  if (count > 0) {
    addExpenseBtn.classList.add("hidden");
    deleteExpensesBtn.classList.remove("hidden");
    selectedItemsCount.innerHTML = `${count} items selected`;
  } else {
    addExpenseBtn.classList.remove("hidden");
    deleteExpensesBtn.classList.add("hidden");
    selectedItemsCount.innerHTML = "";
  }
}

export function clearDateSortingIndicators() {
  const btnSortDate = document.querySelector(".btn-sort-date");

  const sortAsc = btnSortDate.querySelector(".sort-asc");
  const sortDsc = btnSortDate.querySelector(".sort-dsc");

  sortAsc.classList.remove("text-blue-500");
  sortDsc.classList.remove("text-blue-500");

  btnClearDateSort.classList.add("hidden");
}
export function clearAmountSortingIndicators() {
  const btnSortAmount = document.querySelector(".btn-sort-amount");

  const sortAsc = btnSortAmount.querySelector(".sort-asc");
  const sortDsc = btnSortAmount.querySelector(".sort-dsc");

  sortAsc.classList.remove("text-blue-500");
  sortDsc.classList.remove("text-blue-500");

  btnClearAmountSort.classList.add("hidden");
}

