import { addExpenseBtn, expenseForm, expensesContainer } from "../UI/elements";

export function registerEvents({
  onAddExpense,
  onSubmitForm,
  onEditExpense,
  onSubmitEditForm,
  onCancelEditForm,
  onDeleteExpense
}) {
  addExpenseBtn.addEventListener("click", onAddExpense);

  expenseForm.addEventListener("submit", onSubmitForm);

  expensesContainer.addEventListener("click", onEditExpense);

  expensesContainer.addEventListener("submit", onSubmitEditForm);

  expensesContainer.addEventListener("click", onCancelEditForm);

  expensesContainer.addEventListener("click", onDeleteExpense);
}

