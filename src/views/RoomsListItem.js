import { Button } from "../common/Button";
import { RoomDetails } from "./RoomDetails";
import { AddToCartButton } from "../common/AddToCartButton";
import executive from "../assets/executive.jpg";
import grand from "../assets/grand.jpg";
import junior from "../assets/junior.jpg";
import senior from "../assets/senior.jpg";
import standard from "../assets/standard.jpg";
import studio from "../assets/studio.jpg";
import superior from "../assets/superior.jpg";

export function RoomsListItem(room) {
  const imageImports = [
    executive,
    grand,
    junior,
    senior,
    standard,
    studio,
    superior,
  ];
  const div = document.createElement("div");
  div.classList.add("room");
  div.innerHTML = `
              <div class="room__img-wrapper my-3">
                <img class="room__img">
              </div>
              <div class="my-3">
                 <h4 class="room__title">${room.name}</h4>
              <p>
                <strong>${room.price.toFixed(2)} zł / noc</strong>
              </p>
              <p>Powierzchnia: ${room.property.area} m<sup>2</sup></p>
              <p>Balkon / Taras: ${room.property.balcony} </p>
              </div>
              <div class="room__action-btns my-3"></div>
              `;

  const img = div.querySelector(".room__img");
  const nameToArr = room.name.split(" ");
  const nameToLower = nameToArr[1].toLowerCase();

  imageImports.forEach((image) => {
    if (image.match(nameToLower)) {
      img.src = image;
    }
  });

  div.querySelector(".room__action-btns").append(
    Button({
      text: "Sprawdź szczegóły",
      classes: "btn btn-primary my-3 py-2 px-3",
      onClick: () => {
        const customEvent = new CustomEvent("navigate", {
          detail: () => RoomDetails(room.id),
        });
        document.body.dispatchEvent(customEvent);
      },
    })
  );

  div
    .querySelector(".room__action-btns")
    .append(AddToCartButton(room, "Dodaj do koszyka", "btn btn-secondary"));
  return div;
}
