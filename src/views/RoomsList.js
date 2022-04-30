import { RoomsListItem } from "./RoomsListItem";
const axios = require("axios");

export function RoomsList() {
  const section = document.createElement("section");

  section.innerHTML = `<header>
  <h2>Pokoje i Apartamenty</h2>
  <p>Komfortowy wypoczynek w przytulnej atmosferze, z pięknym widokiem, łąki i lasy – nasze pokoje i apartamenty zostały zaprojektowane tak, by zapewnić wygodę i poczucie prywatności oraz dostarczyć niezapomnianych wrażeń. Udogodnienia, w które dla wygody Gości wyposażone są pokoje, odpowiadają najbardziej wyrafinowanym gustom.</p>
  <h2 class="loading-info">Loading...</h2>
  </header>`;

  axios.get("http://localhost:3000/rooms").then(function (response) {
    const ul = document.createElement("ul");
    const list = response.data.map((room) => RoomsListItem(room));
    ul.append(...list);
    section.querySelector(".loading-info").remove();
    section.append(ul);
  });
  return section;
}
