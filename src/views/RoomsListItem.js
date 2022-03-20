import { Button } from "../common/Button";
import { RoomDetails } from "./RoomDetails";
import { AddToCartButton } from "../common/AddToCartButton";

export function RoomsListItem(room) {
  const li = document.createElement("li");
  li.innerHTML = `
              <img src="">
              <h4>${room.name}</h4>
              <p>
              <strong>${room.price.toFixed(2)} zł / noc</strong>
              </p>
              <p>Powierzchnia: ${room.property.area} m<sup>2</sup></p>
              <p>Balkon / Taras: ${room.property.balcony} </p>
              `;

  li.append(
    Button({
      text: "Sprawdź szczegóły",
      classes: "btn btn-primary",
      onClick: () => {
        const customEvent = new CustomEvent("navigate", {
          detail: () => RoomDetails(room.id),
        });
        document.body.dispatchEvent(customEvent);
      },
    })
  );

  li.append(AddToCartButton(room));
  return li;
}
