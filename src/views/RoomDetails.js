import { RoomsList } from "./RoomsList";
import { Button } from "../common/Button";

const backButton = Button({
  text: "Back",
  classes: "btn btn-primary",
  onClick: () => {
    const customEvent = new CustomEvent("navigate", {
      detail: RoomsList,
    });

    document.body.dispatchEvent(customEvent);
  },
});

export function RoomDetails(id) {
  const section = document.createElement("section");

  section.innerHTML = `<h2>Room Details</h2>
  <header>Loading...</header>`;

  fetch(`http://localhost:3000/rooms/${id}`)
    .then((response) => response.json())
    .then((room) => {
      section.querySelector("header").remove();

      const article = document.createElement("article");
      article.innerHTML = `
      <h3>${room}</h3>
      <hr>
      <p>${room.description}</p>
      <hr>
      <p>🛏️ ${room.beds}</p>
      <p>🙍 ${room.guests}</p>
      <p>
      <strong>${room.price.toFixed(2)} PLN</strong>
      </p>
      `;

      section.append(article, backButton);
    });

  return section;
}
