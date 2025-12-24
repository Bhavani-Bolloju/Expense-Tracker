import { formatDate } from "../utils/format";
import { state } from "../core/state";

const paymentTypes = function () {
  const allPaymentTypes = state.expenses.map((item) => item.payment);

  const uniquePaymentTypes = new Set(allPaymentTypes);
  uniquePaymentTypes.add("cash");
  uniquePaymentTypes.add("credit");
  uniquePaymentTypes.add("debit");

  return [...uniquePaymentTypes];
};

export function expenseTemplate(item, rowNum) {
  // console.log(item, rowNum);

  const row = `<tr class="expense-item item-${
    item.id
  }  group static" data-id="${item.id}" >
                <td class="td">
                  <input type="checkbox" class="check_${item.id}" data-check="${
    item.id
  }" />
                </td>
                <td class="rowNum">${rowNum}</td>
                <td class="td">
                  <span class="date_value group-[.edit]:hidden">
                      ${formatDate(item.date)}
                  </span>
                  <span class="group-[.static]:hidden">
                    <input
                      type="date"
                      class="input_date"
                      name="date"
                      value="${item.date}"
                      form="edit_form-${item.id}"
                      required
                    />
                  </span>
                </td>
                <td class="td">
                  <span class="category_value group-[.edit]:hidden">${
                    item.category
                  }</span>
                  <span class="group-[.static]:hidden">
                      <input
                      type="text"
                      placeholder="enter category"
                      class="input_category"
                      name="category"
                      value="${item.category}"
                     form="edit_form-${item.id}"
                      required
                    />
                  </span>
                </td>

                <td class="td">
                  <span class="description_value group-[.edit]:hidden">${
                    item.description
                  }</span>
                  <span class="group-[.static]:hidden">
                    <input
                      type="text"
                      placeholder="Enter description"
                      class="input_description"
                      name="description"
                      value="${item.description}"
                      form="edit_form-${item.id}"
                      required
                    />
                  </span>
                </td>
                <td class="td">
                  <span class="group-[.edit]:hidden">
                    <span>$</span>
                    <span class="amount_value ">
                    ${Number(item.amount).toFixed(2)}
                    </span>
                  </span>
                  <span class="group-[.static]:hidden">
                    <input
                      type="number"
                      placeholder="Enter Amount"
                      class="input_amount"
                      name="amount"
                      value="${item.amount}"
                      form="edit_form-${item.id}"
                      required
                    />
                  </span>
                </td>
                <td class="td">
                  <span class="payment_value group-[.edit]:hidden">${
                    item.payment
                  }</span>
                  <span class="group-[.static]:hidden">
                    <select
                      name="payment"
                      class="input_payment"
                      form="edit_form-${item.id}"
                      required
                    >
                      ${paymentTypes()
                        .map(
                          (payment, i) =>
                            `  <option class="capitalize" value="${payment.toLowerCase()}" key="${i}">
                            ${payment.toLowerCase()}
                          </option>`
                        )
                        .join("")}
                    </select>
                  </span>
                </td>
                <td class="td">
                  <button type="button" class="btn btn-ghost btn_edit group-[.edit]:hidden ">Edit</button>
                  
                  <button type="submit" form="edit_form-${
                    item.id
                  }" class="btn btn-primary px-2 py-1 btn_save btn_save-${
    item.id
  } group-[.static]:hidden">save</button>
                  <span>/</span>
                  <button type="button" class="btn btn-danger btn_delete group-[.edit]:hidden">Delete</button>
                  <button type="button" class="btn btn-ghost btn_cancel group-[.static]:hidden">Cancel</button>
                </td>
              
            </tr>
   `;

  return row;
  // document.querySelector(".expenses_list").insertAdjacentHTML("beforeend", row);
}

export function addNewExpenseFormTemplate() {
  const filterTypes = state.expenses
    .filter((item) => item.category)
    .map((item) => item.category);

  const uniqueTypes = new Set(filterTypes);

  return `
          <tr class="fill-expenses-row ">
            <td class=""></td>
            <td class=""></td>
            <td class="">
              <input
                type="date"
                class="input_date"
                name="date"
                form="expenseForm"
                required
              />
            </td>
            <td class="px-5 py-3">
              <input
                placeholder="enter category"
                class="input_category"
                name="category"
                list = "category"
                form="expenseForm"
                required
              />
              
               <datalist id="category">
                  ${[...uniqueTypes]
                    .map((type) => {
                      return `<option value="${type}"></option>`;
                    })
                    .join("")}
                </datalist>
            </td>

            <td class="px-2.5 py-3 text-start">
              <input
                type="text"
                placeholder="Enter description"
                class="input_description"
                name="description"
                form="expenseForm"
                required
              />
            </td>
            <td class="px-2.5 py-3 text-center">
              <input
                type="number"
                placeholder="Enter Amount"
                class="input_amount"
                name="amount"
                form="expenseForm"
                required
              />
            </td>
            <td class="px-2.5 py-3 text-center">
              <select
                name="payment"
                class="input_payment"
                form="expenseForm"
                required
              >
                ${paymentTypes().map(
                  (payment, i) =>
                    ` <option value="${payment}" key="${i}">${payment}</option>`
                )}
              </select>
            </td>
            <td class="px-2.5 py-3 text-center">
              <button
                type="submit"
                form="expenseForm"
                class="confirm btn btn-primary"
              >
                Confirm
              </button>
              <span>/</span>
              
              <button class="cancel_addExpense btn btn-ghost" form="expenseForm" type="button"> 
                Cancel
              </button>
            </td>
          </tr>
      `;
}

