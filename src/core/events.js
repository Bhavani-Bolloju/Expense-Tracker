import { addExpenseBtn, expenseForm } from "../UI/elements";

export function registerEvents({ onAddExpense, onSubmitForm }) {
  addExpenseBtn.addEventListener("click", onAddExpense);

  expenseForm.addEventListener("submit", onSubmitForm);
}

