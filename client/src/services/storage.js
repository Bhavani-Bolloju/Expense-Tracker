export const storage = {
  loadExpenses: () => {
    const getData = localStorage.getItem("expenses");
    return JSON.parse(getData);
  },

  addExpenses: (data) => {
    localStorage.setItem("expenses", JSON.stringify(data));
  },

  removeExpenses: (key) => {
    localStorage.removeItem(key);
  }
};

