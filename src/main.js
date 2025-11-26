import { storage } from "./services/storage";
import { state } from "./core/state";
import { dummyData } from "./core/state";
import { renderExpenses } from "./UI/render";

import {
  handleAddExpense,
  handleSubmitForm,
  handleEditExpense,
  handleSubmitEditExpense,
  handleCancelEdit,
  handleDeleteExpense
} from "./features/expenses";

import { registerEvents } from "./core/events";

//load & render initial expenses to the DOM
const saved = storage.loadExpenses("expenses");
state.expenses = saved ? saved : dummyData;
renderExpenses(state.expenses);

//add new expense
registerEvents({
  onAddExpense: handleAddExpense,
  onSubmitForm: handleSubmitForm,
  onEditExpense: handleEditExpense,
  onSubmitEditForm: handleSubmitEditExpense,
  onCancelEditForm: handleCancelEdit,
  onDeleteExpense: handleDeleteExpense
});

/*

addExpenseBtn -> click -> show the form

*/

function enableEditing(rowId) {
  const row = document.querySelector(`.item-${rowId}`);

  row.classList.remove("static");
  row.classList.add("edit");

  //adding new form element
  const newForm = document.createElement("form");
  newForm.setAttribute("id", `edit_form-${rowId}`);
  expensesContainer.prepend(newForm);
}

//save edit feature
function saveEditData(rowId) {
  const row = document.querySelector(`.item-${rowId}`);

  const editForm = document.querySelector(`#edit_form-${rowId}`);

  const formData = getFormData(editForm);

  if (!formData) return;

  const dateInputEL = row.querySelector(".date_value");
  const categoryInputEl = row.querySelector(".category_value");
  const descriptionInputEl = row.querySelector(".description_value");
  const amountInputEl = row.querySelector(".amount_value");
  const paymentInputEl = row.querySelector(".payment_value");

  //update DOM
  dateInputEL.innerHTML = formatDate(inputData.date);
  categoryInputEl.innerHTML = inputData.category;
  descriptionInputEl.innerHTML = inputData.description;
  amountInputEl.innerHTML = inputData.amount;
  paymentInputEl.innerHTML = inputData.payment;

  //add static, remove edit
  row.classList.add("static");
  row.classList.remove("edit");

  //remove the form element from the DOM
  editForm.remove();

  //update local storage
  const data = storedExpensesData();
  const itemIndex = data.findIndex((item) => item.id == rowId);
  const updateItem = { ...data[itemIndex], ...inputData };
  data[itemIndex] = updateItem;
  storedExpensesData(data);
}

//cancel edit feature

function cancelEdit(rowId) {
  const row = document.querySelector(`.item-${rowId}`);
  const editForm = document.querySelector(`#edit_form-${rowId}`);
  row.classList.add("static");
  row.classList.remove("edit");
  editForm.remove();
}

//delete expense item

function deleteExpense(rowId) {
  const row = document.querySelector(`.item-${rowId}`);

  let data = storedExpensesData();

  data = data.filter((item) => item.id !== rowId);

  //update the DOM with update information
  expensesContainer.innerHTML = "";
  generateExpensesList(data);

  //update the local storage
  storedExpensesData(data);
}

//render expenses with the available data

//adding new expense to the list
// addBtn.addEventListener("click", function () {
//   expenseForm.classList.toggle("hidden");
// });

// adding new expense
// submitExpense.addEventListener("click", function (e) {
//   const formData = getFormInputsData(addNewExpenseForm);

//   if (!formData) return;

//   e.preventDefault();

//   const inputData = Object.fromEntries(formData.entries());

//   const item = { ...inputData, id: nanoid(4) };

//   createNewExpense(item, data.length + 1);

//   data.push(item);

//   storedExpensesData(data);

//   addNewExpenseForm.reset();

//   expenseForm.classList.add("hidden");
// });

//activating edit feature
// expensesContainer.addEventListener("click", function (e) {
//   //it has to btn edit, ignore rest
//   const btnEdit = e.target.classList.contains("btn_edit");

//   if (!btnEdit) return;

//   const expense_el = e.target.closest("tr");
//   const rowId = expense_el.dataset.id;

//   expense_el.classList.remove("static");
//   expense_el.classList.add("edit");

//   //adding new form element
//   const newForm = document.createElement("form");
//   newForm.setAttribute("id", `edit_form-${rowId}`);
//   expensesContainer.prepend(newForm);
// });

//edit expense item and submit
// expensesContainer.addEventListener("click", function (e) {
//   //it has to btn edit, ignore rest
//   const isBtnSave = e.target.classList.contains("btn_save");

//   if (!isBtnSave) return;

//   e.preventDefault();

//   // console.log(e.target);

//   const row = e.target.closest("tr");
//   const rowId = row.dataset.id;

//   const editForm = document.querySelector(`#edit_form-${rowId}`);

//   if (!editForm.checkValidity()) {
//     editForm.reportValidity();
//     return;
//   }
//   const formData = new FormData(editForm);
//   const inputData = Object.fromEntries(formData.entries());

//   const date = row.querySelector(".date_value");
//   const category = row.querySelector(".category_value");
//   const description = row.querySelector(".description_value");
//   const amount = row.querySelector(".amount_value");
//   const payment = row.querySelector(".payment_value");

//   //update DOM
//   date.innerHTML = formatDate(inputData.date);
//   category.innerHTML = inputData.category;
//   description.innerHTML = inputData.description;
//   amount.innerHTML = inputData.amount;
//   payment.innerHTML = inputData.payment;

//   //add static, remove edit
//   row.classList.add("static");
//   row.classList.remove("edit");

//   //remove the form element from the DOM
//   editForm.remove();

//   //update local storage
//   const itemIndex = data.findIndex((item) => item.id == rowId);
//   const updateItem = { ...data[itemIndex], ...inputData };
//   data[itemIndex] = updateItem;
//   storedExpensesData(data);
// });

//cancel edit changes
// expensesContainer.addEventListener("click", function (e) {
//   const isBtnCancel = e.target.classList.contains("btn_cancel");

//   if (!isBtnCancel) return;

//   const expense_el = e.target.closest("tr");
//   expense_el.classList.add("static");
//   expense_el.classList.remove("edit");
// });

//delete feature

// expensesContainer.addEventListener("click", function (e) {
//   const isBtnDelete = e.target.classList.contains("btn_delete");

//   if (!isBtnDelete) return;

//   //get the item
//   const row = e.target.closest("tr");
//   const rowId = row.dataset.id;

//   //remove from the list
//   data = data.filter((item) => item.id !== rowId);

//   console.log(data);

//   //update the DOM with update information
//   expensesContainer.innerHTML = "";
//   generateExpensesList(data);

//   //update the local storage
//   storedExpensesData(data);
// });

