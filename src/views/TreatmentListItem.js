// const axios = require("axios");
import { AddToCartButton } from "../common/AddToCartButton";
import abhyangam from "../assets/abhyangam-treatment.jpg";
import aroma from "../assets/aroma-treatment.jpg";
import balinese from "../assets/balinese-treatment.jpg";
import champagne from "../assets/champagne-treatment.jpg";
import feet from "../assets/feet-treatment.jpg";
import head from "../assets/head-treatment.jpg";
import minerals from "../assets/minerals-treatment.jpg";
import rock from "../assets/rock-treatment.jpg";
import thai from "../assets/thai-treatment.jpg";

export function TreatmentListItem(treatment) {
  const imageImports = [
    abhyangam,
    aroma,
    balinese,
    champagne,
    feet,
    head,
    minerals,
    rock,
    thai,
  ];
  const article = document.createElement("article");
  article.classList.add("treatment");
  article.innerHTML = `
        <div class="treatment__img-wrapper">
          <img class="treatment__img">
        </div>
        <h4 class="text-center my-3">${treatment.name}</h4>
        <div class="treatment__wrapper">
          <p class="my-2">⏰ ${treatment.time} minutes</p>
          <p class="my-2">
            <strong>${treatment.price.toFixed(2)} PLN</strong>
          </p>
        </div>
        <p class="treatment__description my-3">${treatment.description}</p>
    `;
  const img = article.querySelector(".treatment__img");

  imageImports.forEach((image) => {
    if (image.match(treatment.image)) {
      img.src = image;
    }
  });

  article.append(
    AddToCartButton(treatment, "Dodaj do koszyka", "btn btn-secondary")
  );
  return article;
}
