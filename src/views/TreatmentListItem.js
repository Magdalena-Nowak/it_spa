// const axios = require("axios");
import { AddToCartButton } from "../common/AddToCartButton";

export function TreatmentListItem(treatment) {
  const article = document.createElement("article");
  const image = new Image(500, 500);
  image.src = treatment.img;

  article.innerHTML = `
        <h4>${treatment.name}</h4>
        <p>⏰ ${treatment.time} minutes</p>
        <p>
            <strong>${treatment.price.toFixed(2)} PLN</strong>
        </p>
        <p>${treatment.description}</p>
    `;

  //Add image

  article.append(
    image,
    AddToCartButton(treatment, "Dodaj do koszyka", "btn btn-secondary")
  );
  // image.src = treatment.img;
  // console.log("img", treatment.img);

  // article.querySelector(".treat-image").src = require(treatment.img);
  return article;
}
