import { Button } from "../common/Button";
import { RoomDetails } from "./RoomDetails";

export function RoomsListItem(room) {
  const li = document.createElement("li");
  li.innerHTML = `
              <h4>${room.name}</h4>
              <p>
              <strong>${room.price.toFixed(2)} PLN</strong>
              </p>
              `;

  li.append(
    Button({
      text: "View details",
      classes: "btn btn-primary",
      onClick: () => {
        const customEvent = new CustomEvent("navigate", {
          detail: () => RoomDetails(room.id),
        });
        document.body.dispatchEvent(customEvent);
      },
    })
  );
  return li;
}
