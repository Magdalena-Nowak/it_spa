const axios = require("axios");
import { TreatmentListItem } from "./TreatmentListItem";

export function TreatmentsList() {
  const section = document.createElement("section");

  section.innerHTML = `
    <h2 class="text-center">Treatments</h2>
    <header class="text-center">Loading...</header>
    `;

  axios.get("http://localhost:3000/treatments").then((response) => {
    const articles = response.data.map((treatment) =>
      TreatmentListItem(treatment)
    );
    section.querySelector("header").remove();
    section.append(...articles);
  });

  return section;
}
