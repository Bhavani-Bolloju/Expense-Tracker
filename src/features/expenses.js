import { expenseFormRow } from "../UI/elements";
import { nanoid } from "nanoid";
import { renderNewExpense } from "../UI/render";

import { state } from "../core/state";

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

