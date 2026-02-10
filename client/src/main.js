import { storage } from "./services/storage";
import { state } from "./core/state";
import { dummyData } from "./core/state";
import {
  renderExpenses,
  displayFilterCategoryOptions,
  updateTotalPages
} from "./UI/render";

import { pagination } from "./services/pagination";

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
  handlePrevPage
} from "./features/expenses";

import { registerEvents } from "./core/events";

//load & render initial expenses to the DOM
let saved = storage.loadExpenses();

if (!saved) {
  storage.addExpenses(dummyData);
  // state.expenses = dummyData;
  saved = storage.loadExpenses();
}

state.expenses = saved;

//set total expenses count
pagination.setTotalItems(state.expenses.length);

const currPageItems = pagination.getPageItems(state.expenses);
renderExpenses(currPageItems);

displayFilterCategoryOptions(state.expenses);
updateTotalPages(pagination.totalPageCount);

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
  onPrevPage: handlePrevPage
});

