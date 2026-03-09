import apiClient from "./client";
export const getAllExpenses = async () => {
  const req = await apiClient("/api/expenses");

  if (!req.ok) {
    const error = await req.json();
    throw new Error(error.error || "Failed to fetch expenses");
  }

  const res = await req.json();
  return res;
};

export const addNewExpense = async (expenseData) => {
  const req = await apiClient("/api/expenses", {
    method: "POST",
    body: JSON.stringify(expenseData)
  });

  if (!req.ok) {
    const error = await req.json();
    throw new Error(error.error || "failed to create new expense");
  }

  const res = await req.json();
  return res;
};

export const deleteExpense = async (id) => {
  const req = await apiClient(`/api/expenses/${id}`, {
    method: "DELETE"
  });

  if (!req.ok) {
    const error = await req.json();
    throw new Error(error.error || "Failed to delete expense");
  }

  const res = await req.json();
  return res;
};

export const updateExpense = async (id, data) => {
  const req = await apiClient(`/api/expenses/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

  if (!req.ok) {
    const error = await req.json();
    throw new Error(error.error || "Failed to update");
  }

  const res = await req.json();
  return res;
};

export const multiExpensesDelete = async (ids) => {
  const req = await apiClient("/api/expenses/bulk-delete", {
    method: "DELETE",
    body: JSON.stringify(ids)
  });

  if (!req.ok) {
    const error = await req.json();
    throw new Error(error.error || "Failed to delete expenses");
  }

  const res = await req.json();
  return res;
};

