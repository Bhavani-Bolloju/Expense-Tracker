import { expenseTemplate } from "./templates";
import { expensesContainer } from "./elements";

export function renderExpenses(expenses) {
  const list = expenses
    ?.map((item, index) => {
      return expenseTemplate(item, index + 1);
    })
    .join("");

  // expensesContainer.innerHTML = "";
  expensesContainer.insertAdjacentHTML("beforeend", list);
}

export function renderNewExpense(expense, rowId) {
  const row = expenseTemplate(expense, rowId);
  expensesContainer.insertAdjacentHTML("beforeend", row);
}

