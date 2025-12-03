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
  handleDeleteExpense,
  handleMultiSelectExpenses,
  handleSelectAllExpenses,
  handleMultiSelectedExpensesDelete,
  handleSortingDate,
  handleClearSorting,
  handleCancelAddExpense,
  handleSortingAmount
} from "./features/expenses";

import { registerEvents } from "./core/events";

//load & render initial expenses to the DOM
const saved = storage.loadExpenses();

if (!saved) {
  storage.addExpenses(dummyData);
}

state.expenses = storage.loadExpenses();

renderExpenses(state.expenses);

//add new expense
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
  onCancelAddExpense: handleCancelAddExpense
});

