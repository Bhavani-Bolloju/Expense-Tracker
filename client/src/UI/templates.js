import { formatDate } from "../utils/format";

import { paymentTypes, categoryType } from "../core/state";

export function expenseTemplate(item, rowNum) {
  const row = `<tr class="expense-item item-${
    item._id
  } group static" data-id="${item._id}" >
                <td class="td">
                  <input type="checkbox" class="check_${item._id}" data-check="${
                    item._id
                  }" />
                </td>
                <td class="rowNum">${rowNum}</td>
                <td class="td">
                  <span class="date_value group-[.edit]:hidden">
                      ${formatDate(new Date(item.date))}
                  </span>
                  <span class="group-[.static]:hidden">
                    <input
                      type="date" 
                      class="input_date"
                      name="date"
                      value="${new Date(item.date).toISOString().slice(0, 10)}"
                      form="edit_form-${item._id}"
                      required
                      aria-label="Expense date"
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
                     form="edit_form-${item._id}"
                      required
                      aria-label="Expense category"
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
                      form="edit_form-${item._id}"
                      aria-label="Expense description"
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
                      form="edit_form-${item._id}"
                      aria-label="Expense amount"
                      required
                    />
                  </span>
                </td>
                <td class="td">
                  <span class="payment_value group-[.edit]:hidden">${item.payment
                    .toLowerCase()
                    .split("_")
                    .join(" ")}</span>
                  <span class="group-[.static]:hidden">
                    <select
                      name="payment"
                      class="input_payment"
                      form="edit_form-${item._id}"
                      required
                      aria-label="Payment method"
                    >
                      ${paymentTypes
                        .map(
                          (payment, i) =>
                            `  <option class="capitalize" value="${payment.toLowerCase()}" key="${i}">
                            ${payment.toLowerCase().split("_").join(" ")}
                          </option>`
                        )
                        .join("")}
                    </select>
                  </span>
                </td>
                <td class="td flex gap-2 flex-nowrap" aria-label="Form edit actions">
                  <button type="button" class="btn_edit group-[.edit]:hidden " aria-label="edit expense">Edit</button>
                  
                  
          <button type="submit" form="edit_form-${
            item._id
          }" class="px-2 py-1 btn_save btn_save-${
            item._id
          } group-[.static]:hidden" aria-label="save edit expense">save</button>
                  <span>/</span>
                  <button type="button" aria-label="delete expense" class="btn_delete group-[.edit]:hidden">Delete</button>
                  <button type="button" aria-label="cancel edit expense" class="btn_cancel group-[.static]:hidden">Cancel</button>
                </td>
              
            </tr>
   `;

  return row;
}

export function addNewExpenseFormTemplate() {
  return `
          <tr class="fill-expenses-row" id="add-expense-form">
            <td class=""></td>
            <td class=""></td>
            <td class="">
              <input
                type="date"
                class="input_date"
                name="date"
                form="expenseForm"
                required
                aria-label="Expense date"
              />
            </td>
            <td class="px-5 py-3">
              <input
                placeholder="enter category"
                class="input_category"
                name="category"
                list = "category"
                form="expenseForm"
                aria-label="Expense category type"
                required
              />
              
               <datalist id="category">
                  ${[...categoryType]
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
                aria-label="Expense description"
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
                aria-label="Expense amount"
                required
              />
            </td>
            <td class="px-2.5 py-3 text-center">
              <select
                name="payment"
                class="input_payment"
                form="expenseForm"
                aria-label="Payment method"
                required
              >
                ${paymentTypes.map(
                  (payment, i) =>
                    ` <option className="capitalize" value="${payment}" key="${i}">${payment.split("_").join(" ")}</option>`
                )}
              </select>
            </td>
            <td class="px-2.5 py-3 text-center whitespace-nowrap" aria-label="Form actions">
              <button
                type="submit"
                form="expenseForm"
                class="confirm btn_confirm"

              >
                Confirm
              </button>
              <span>/</span>
              
              <button class="cancel_addExpense btn_cancel" form="expenseForm" type="button" aria-label="cancel add expense"> 
                Cancel
              </button>
            </td>
          </tr>
      `;
}

