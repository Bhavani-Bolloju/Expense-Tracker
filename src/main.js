const btn_addCustomer = document.querySelector(".add-customer");

const expensesContainer = document.querySelector(".expenses_list");

btn_addCustomer?.addEventListener("click", function () {
  console.log("btn clicked");
});

//render some generate data into the expenses table

const data = [
  {
    id: 1,
    date: "2025-10-04",
    category: "shopping",
    description: "family festival shopping",
    amount: 150,
    payment: "cash"
  },
  {
    id: 2,
    date: "2025-09-20",
    category: "movie",
    description: "college friends outing",
    amount: 200,
    payment: "Debit card"
  },
  {
    id: 3,
    date: "2025-11-04",
    category: "Books",
    description: "Amazon books",
    amount: 10,
    payment: "cash"
  },
  {
    id: 4,
    date: "2025-10-10",
    category: "Internet Bill",
    description: "Monthly internet bill",
    amount: 50,
    payment: "Credit card"
  }
];

const expenseRow = `
        <tr>
              <td class="px-2.5 py-3">
                <input type="checkbox" />
              </td>
              <td class="px-2.5 py-3 min-w-5">1</td>
              <td class="px-2.5 py-3">2025-11-03</td>
              <td class="px-5 py-3">Groceries</td>

              <td class="px-2.5 py-3 text-center">Trader Joe’s</td>
              <td class="px-2.5 py-3 text-center">$45.23</td>
              <td class="px-2.5 py-3 text-center">Credit Card</td>
              <td class="px-2.5 py-3 text-center">Edit/Delete</td>
          </tr>

`;

function generateExpensesList(expenses) {
  const list = expenses
    .map((item) => {
      const customFormatter = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
      const formatDate = customFormatter.format(new Date(item.date));
      // console.log(formatDate, new Date(formatDate));

      return ` <tr>
              <td class="px-2.5 py-3">
                <input type="checkbox" />
              </td>
              <td class="px-2.5 py-3 min-w-5">${item.id}</td>
              <td class="px-2.5 py-3">${formatDate}</td>
              <td class="px-5 py-3">${item.category}</td>

              <td class="px-2.5 py-3 text-center">${item.description}</td>
              <td class="px-2.5 py-3 text-center">$${item.amount.toFixed(
                2
              )}</td>
              <td class="px-2.5 py-3 text-center">${item.payment}</td>
              <td class="px-2.5 py-3 text-center">Edit/Delete</td>
            </tr>`;
    })
    .join("");

  expensesContainer.insertAdjacentHTML("beforeend", list);
}

generateExpensesList(data);

