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
  handleSortingDate
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
  onDeleteExpense: handleDeleteExpense,
  onSelectExpenses: handleMultiSelectExpenses,
  onSelectAll: handleSelectAllExpenses,
  onMultiDelete: handleMultiSelectedExpensesDelete,
  onDateSort: handleSortingDate
});

