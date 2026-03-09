import {
  handleAddExpense,
  handleSubmitForm,
  handleEditExpense,
  handleSubmitEditExpense,
  handleCancelEdit,
  handleDeleteExpense,
  handleMultiSelectExpenses,
  handleSelectAllExpenses,
  handleMultiSelectedExpensesDelete,
  handleSortingDate,
  handleClearSorting,
  handleCancelAddExpense,
  handleSortingAmount,
  handleFilterCategory,
  handleSearchWithKeywords,
  handleNextPage,
  handlePrevPage,
  handleLogout,
  getExpenses
} from "./features/expenses";

import { registerEvents } from "./core/events";

import { addFilterCategoryOptions } from "./UI/render";

import { categoryType } from "./core/state";

getExpenses();

addFilterCategoryOptions(categoryType);

registerEvents({
  onAddExpense: handleAddExpense,
  onSubmitForm: handleSubmitForm,
  onEditExpense: handleEditExpense,
  onSubmitEditForm: handleSubmitEditExpense,
  onCancelEditForm: handleCancelEdit,
  onDeleteExpense: handleDeleteExpense,
  onSelectExpenses: handleMultiSelectExpenses,
  onSelectAll: handleSelectAllExpenses,
  onMultiDelete: handleMultiSelectedExpensesDelete,
  onDateSort: handleSortingDate,
  onAmountSort: handleSortingAmount,
  onClearSorting: handleClearSorting,
  onCancelAddExpense: handleCancelAddExpense,
  onFilterCategory: handleFilterCategory,
  onSearchWithKeywords: handleSearchWithKeywords,
  onNextPage: handleNextPage,
  onPrevPage: handlePrevPage,
  onLogout: handleLogout
});

//  window.location.href = "/signin.html";

