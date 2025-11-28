import {
  addExpenseBtn,
  expenseForm,
  expensesContainer,
  selectAllCheckbox,
  deleteExpensesBtn
} from "../UI/elements";

export function registerEvents({
  onAddExpense,
  onSubmitForm,
  onEditExpense,
  onSubmitEditForm,
  onCancelEditForm,
  onDeleteExpense,
  onSelectExpenses,
  onSelectAll,
  onMultiDelete
}) {
  addExpenseBtn.addEventListener("click", onAddExpense);

  expenseForm.addEventListener("submit", onSubmitForm);

  expensesContainer.addEventListener("click", onEditExpense);

  expensesContainer.addEventListener("submit", onSubmitEditForm);

  expensesContainer.addEventListener("click", onCancelEditForm);

  expensesContainer.addEventListener("click", onDeleteExpense);

  expensesContainer.addEventListener("change", onSelectExpenses);

  selectAllCheckbox.addEventListener("click", onSelectAll);

  deleteExpensesBtn.addEventListener("click", onMultiDelete);
}

