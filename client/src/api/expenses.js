import apiClient from "./client";
export const getAllExpenses = async () => {
  try {
    const req = await apiClient("/api/expenses");
    const res = await req.json();
    // console.log(res, "get all expenses fn");
    if (!req.ok) {
      throw new Error(res.error);
    }
    return res;
  } catch (error) {
    console.log(error, "from getting all expenses");
  }
};

export const addNewExpense = async (expenseData) => {
  try {
    const req = await apiClient("/api/expenses", {
      method: "POST",
      body: JSON.stringify(expenseData)
    });

    const res = await req.json();

    if (!req.ok) {
      throw new Error(res.error);
    }

    return res;
  } catch (error) {
    console.log(error, "error adding new expense");
  }
};

export const deleteExpense = async (id) => {
  try {
    const req = await apiClient(`/api/expenses/${id}`, {
      method: "DELETE"
    });

    const res = await req.json();

    return res;
  } catch (error) {
    console.log(error, "client delete expense");
  }
};

