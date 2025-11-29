import { formatDate } from "../utils/format";

export function expenseTemplate(item, rowNum) {
  // console.log(item, rowNum);

  const row = `<tr class="item-${
    item.id
  } not-last:border-b-2 border-gray-200  group static" data-id="${item.id}" >
                <td class="px-2.5 py-3">
                  <input type="checkbox" class="check_${item.id}" data-check="${
    item.id
  }" />
                </td>
                <td class="px-2.5 py-3 min-w-5 rowNum">${rowNum}</td>
                <td class="px-2.5 py-3">
                  <span class="date_value group-[.edit]:hidden">
                      ${formatDate(item.date)}
                  </span>
                  <span class="group-[.static]:hidden">
                    <input
                      type="date"
                      class="border border-gray-400 px-2 input_date"
                      name="date"
                      value="${item.date}"
                      form="edit_form-${item.id}"
                      required
                    />
                  </span>
                </td>
                <td class="px-5 py-3">
                  <span class="category_value group-[.edit]:hidden">${
                    item.category
                  }</span>
                  <span class="group-[.static]:hidden">
                      <input
                      type="text"
                      placeholder="enter category"
                      class="border border-gray-400 px-2 input_category"
                      name="category"
                      value="${item.category}"
                     form="edit_form-${item.id}"
                      required
                    />
                  </span>
                </td>

                <td class="px-2.5 py-3 text-center">
                  <span class="description_value group-[.edit]:hidden">${
                    item.description
                  }</span>
                  <span class="group-[.static]:hidden">
                    <input
                      type="text"
                      placeholder="Enter description"
                      class="border border-gray-400 px-2 input_description"
                      name="description"
                      value="${item.description}"
                      form="edit_form-${item.id}"
                      required
                    />
                  </span>
                </td>
                <td class="px-2.5 py-3 text-center">
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
                      class="border border-gray-400 px-2 input_amount"
                      name="amount"
                      value="${item.amount}"
                      form="edit_form-${item.id}"
                      required
                    />
                  </span>
                </td>
                <td class="px-2.5 py-3 text-center">
                  <span class="payment_value group-[.edit]:hidden">${
                    item.payment
                  }</span>
                  <span class="group-[.static]:hidden">
                    <select
                      name="payment"
                      class="border border-gray-400 px-2 input_payment"
                      form="edit_form-${item.id}"
                      required
                    >
                      <option value="cash" ${
                        item.payment === "cash" ? "selected" : ""
                      } >Cash</option>
                      <option value="debit" ${
                        item.payment === "debit" ? "selected" : ""
                      }>Debit</option>
                      <option value="credit" ${
                        item.payment === "credit" ? "selected" : ""
                      }>Credit</option>
                    </select>
                  </span>
                </td>
                <td class="px-2.5 py-3 text-center">
                  <button type="button" class="cursor-pointer btn_edit group-[.edit]:hidden ">Edit</button>
                  
                  <button type="submit" form="edit_form-${
                    item.id
                  }" class="cursor-pointer btn_save btn_save-${
    item.id
  } group-[.static]:hidden">save</button>
                  <span>/</span>
                  <button type="button" class="cursor-pointer btn_delete group-[.edit]:hidden">Delete</button>
                  <button type="button" class="cursor-pointer btn_cancel group-[.static]:hidden">Cancel</button>
                </td>
              
            </tr>
   `;

  return row;

  // document.querySelector(".expenses_list").insertAdjacentHTML("beforeend", row);
}

