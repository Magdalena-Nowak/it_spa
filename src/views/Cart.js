import { cartManager } from "../cart/cart-manager";
import { InsertFromCartButton } from "../common/InsertFromCartButton";
import { RemoveFromCartButton } from "../common/RemoveFromCartButton";
import { SubstractFromCartButton } from "../common/SubstractFromCartButton";

export function Cart() {
  const section = document.createElement("section");
  section.innerHTML = `<h2>Cart</h2>
    <p>Zawartość Twojego koszyka</p>`;
  const table = document.createElement("table");
  table.classList.add("table", "align-middle");

  const tableHead = document.createElement("thead");
  tableHead.innerHTML = `
  <tr>
    <th scope="col">Produkt</th>
    <th class="text-center col-2" scope="col">Cena</th>
    <th class="text-center cart__quantity" scope="col">Ilość</th>
    <th class="text-center col-2" scope="col">Wartość</th>
    <th class="col-2" scope="col">
    
    </th>
    </tr>
    `;

  const tableRows = cartManager.getAllItems().map((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td class="text-center">${item.price} zł</td>
      <td>
      <div class="input-group"></div>
      </td>
      <td class="text-center">${item.value * item.price} zł</td>
      <td class="d-flex justify-content-center"></td>
      `;

    const input = document.createElement("input");
    input.classList.add("form-control");
    input.setAttribute("value", item.value);
    tr.querySelector(".input-group").append(
      SubstractFromCartButton(item, "-", "btn btn-outline-secondary"),
      input,
      InsertFromCartButton(item, "+", "btn btn-outline-secondary")
    );
    tr.lastElementChild.append(RemoveFromCartButton(item));
    return tr;
  });

  const tableFooter = document.createElement("tr");
  tableFooter.innerHTML = `
  <td></td>
  <td></td>
  <td>
  Wartość zamówienia 
  </td>
  <td>
  ${cartManager.getTotal().toFixed(2)} zł
  </td>
  <td></td>
  `;
  const tbody = document.createElement("tbody");
  tbody.append(...tableRows);

  table.append(tableHead, tbody, tableFooter);
  section.append(table);

  return section;
}
