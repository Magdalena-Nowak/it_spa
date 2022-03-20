const axios = require("axios");
import { RoomsList } from "./RoomsList";
import { Button } from "../common/Button";

const backButton = Button({
  text: "Wróć do listy",
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

  section.innerHTML = `<header>Loading...</header>`;

  axios.get(`http://localhost:3000/rooms/${id}`).then(function (response) {
    section.querySelector("header").remove();

    const article = document.createElement("article");
    article.innerHTML = `
      <h2>${response.data.name}</h2>
      <hr>
      <p>${response.data.description}</p>
      <hr>
      `;

    const property = document.createElement("div");
    property.innerHTML = `
    <h3>Właściwości</h3>
    <ul>
    <li>Liczba osób: ${response.data.property.guests}</li>
    <li>Powierzchnia: ${response.data.property.area} m<sup>2</sup></li>
    <li>Balkon / Taras: ${response.data.property.view}</li>
    <li>Łóżka: ${response.data.property.beds}</li>
    <li>Widok: ${response.data.property.view}</li>
    </ul>
    `;

    const facilities = document.createElement("div");
    const facilitiesHeader = document.createElement("h3");
    facilitiesHeader.innerHTML = "Wyposażenie";
    const facilitiesList = document.createElement("ul");
    const facilitiesItem = response.data.facilities.map((item) => {
      const facility = document.createElement("li");
      facility.innerHTML = item;
      return facility;
    });

    facilitiesList.append(...facilitiesItem);
    facilities.append(facilitiesHeader, facilitiesList);
    article.append(property, facilities);
    section.append(article, backButton);
  });

  return section;
}
