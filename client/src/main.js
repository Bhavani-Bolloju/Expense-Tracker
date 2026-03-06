import { storage } from "./services/storage";
import { state } from "./core/state";
import { dummyData } from "./core/state";
import { renderExpenses, updateTotalPages } from "./UI/render";

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

import { handleLogout } from "./api/auth";

import { registerEvents } from "./core/events";

import { getAllExpenses } from "./api/expenses";

import { addFilterCategoryOptions } from "./UI/render";

import { categoryType } from "./core/state";

//load & render initial expenses to the DOM
let saved = storage.loadExpenses();

function init(expenses) {
  state.expenses = expenses;
  pagination.setTotalItems(state.expenses.length);
  const currPageItems = pagination.getPageItems(state.expenses);
  renderExpenses(currPageItems);
  updateTotalPages(pagination.totalPageCount);
}

export async function getExpenses() {
  const res = await getAllExpenses();
  console.log(res, "res");
  init(res);
}

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

