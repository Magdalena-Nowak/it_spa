import { cartManager } from "../cart/cart-manager";
import { RemoveFromCartButton } from "../common/RemoveFromCartButton";

export function Cart() {
  const section = document.createElement("section");
  section.innerHTML = `<h2>Cart</h2>
    <p>Zawartość Twojego koszyka</p>`;
  const table = document.createElement("table");
  table.classList.add("table");

  const tableHead = document.createElement("thead");
  tableHead.innerHTML = `
  <tr>
    <th scope="col">Product</th>
    <th scope="col">Price</th>
    <th scope="col">Quantity</th>
    <th scope="col">Value</th>
    <th scope="col">Delete</th>
    </tr>
    `;

  const tableRows = cartManager.getAllItems().map((item) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price} PLN</td>
      <td>Quantity</td>
      <td>Value</td>
      <td>Delete</td>
      `;
    tr.lastElementChild.append(RemoveFromCartButton(item));
    return tr;
  });

  const tableFooter = document.createElement("tr");
  tableFooter.innerHTML = `
  <td></td>
  <td></td>
  <td></td>
  <td>
  <strong>${cartManager.getTotal().toFixed(2)} PLN</strong>
  </td>
  <td></td>
  `;

  table.append(tableHead, ...tableRows, tableFooter);
  section.append(table);

  return section;
}
