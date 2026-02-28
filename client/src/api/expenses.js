import apiClient from "./client";
export const getAllExpenses = async () => {
  try {
    const req = await apiClient("/api/expenses");
    const res = await req.json();
    console.log(res, "get all expenses fn");
    if (!req.ok) {
      throw new Error(res.error);
    }
    return res;
  } catch (error) {
    console.log(error, "from getting all expenses");
  }
};

