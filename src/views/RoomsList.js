import { RoomsListItem } from "./RoomsListItem";
const axios = require("axios");

export function RoomsList() {
  const section = document.createElement("section");

  section.innerHTML = `<header class="d-flex flex-column justify-content-center align-item-center">
  <h2 class="text-center my-3">Pokoje i Apartamenty</h2>
  <p class="my-3">Komfortowy wypoczynek w przytulnej atmosferze, z pięknym widokiem, łąki i lasy – nasze pokoje i apartamenty zostały zaprojektowane tak, by zapewnić wygodę i poczucie prywatności oraz dostarczyć niezapomnianych wrażeń. Udogodnienia, w które dla wygody Gości wyposażone są pokoje, odpowiadają najbardziej wyrafinowanym gustom.</p>
  <h2 class="loading-info my-3">Loading...</h2>
  </header>
  <div class="rooms-section"></div>
  `;

  axios.get("http://localhost:3000/rooms").then(function (response) {
    const ul = document.createElement("ul");
    ul.classList.add("my-3");
    const list = response.data.map((room) => RoomsListItem(room));
    ul.append(...list);
    section.querySelector(".loading-info").remove();
    const roomsSection = section.querySelector(".rooms-section");
    roomsSection.append(ul);
  });
  return section;
}
