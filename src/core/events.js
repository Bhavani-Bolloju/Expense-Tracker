import {
  addExpenseBtn,
  expenseForm,
  expensesContainer,
  selectAllCheckbox,
  deleteExpensesBtn,
  btnSortDate,
  btnSortAmount,
  btnClearDateSort,
  btnClearAmountSort,
  selectFilterCategory,
  inputSearchEl,
  btnNextEl,
  btnPrevEl
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
  onMultiDelete,
  onDateSort,
  onAmountSort,
  onClearSorting,
  onCancelAddExpense,
  onFilterCategory,
  onSearchWithKeywords,
  onNextPage,
  onPrevPage
}) {
  addExpenseBtn.addEventListener("click", onAddExpense);
  expenseForm.addEventListener("submit", onSubmitForm);
  expensesContainer.addEventListener("click", onCancelAddExpense);

  expensesContainer.addEventListener("click", onEditExpense);

  expensesContainer.addEventListener("submit", onSubmitEditForm);

  expensesContainer.addEventListener("click", onCancelEditForm);

  expensesContainer.addEventListener("click", onDeleteExpense);

  expensesContainer.addEventListener("change", onSelectExpenses);

  selectAllCheckbox.addEventListener("click", onSelectAll);

  deleteExpensesBtn.addEventListener("click", onMultiDelete);

  btnSortDate.addEventListener("click", onDateSort);
  btnSortAmount.addEventListener("click", onAmountSort);

  btnClearDateSort.addEventListener("click", onClearSorting);

  btnClearAmountSort.addEventListener("click", onClearSorting);

  selectFilterCategory.addEventListener("change", onFilterCategory);

  inputSearchEl.addEventListener("input", onSearchWithKeywords);

  btnNextEl.addEventListener("click", onNextPage);
  btnPrevEl.addEventListener("click", onPrevPage);
}

