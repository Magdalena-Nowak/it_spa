const axios = require("axios");
import { AddToCartButton } from "../common/AddToCartButton";

export function TreatmentListItem(treatment) {
  const article = document.createElement("article");

  article.innerHTML = `
        <h4>${treatment.name}</h4>
        <p>⏰ ${treatment.time} minutes</p>
        <p>
            <strong>${treatment.price.toFixed(2)} PLN</strong>
        </p>
        <p>${treatment.description}</p>
    `;

  //Add image

  article.append(AddToCartButton(treatment));
  return article;
}
