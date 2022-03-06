import { RoomsListItem } from "./RoomsListItem";

export function RoomsList() {
  const section = document.createElement("section");

  section.innerHTML = `<h2>Rooms List</h2>
  <header>Loading...</header>`;

  fetch("http://localhost:3000/rooms")
    .then((response) => response.json())
    .then((rooms) => {
      const ul = document.createElement("ul");
      const list = rooms.map((room) => RoomsListItem(room));
      ul.append(...list);
      section.querySelector("header").remove();
      section.append(ul);
    });
  return section;
}
