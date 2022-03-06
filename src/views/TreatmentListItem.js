export function TreatmentListItem(treatment) {
  const article = document.createElement("article");

  article.innerHTML = `
        <h4>${treatment.name}</h4>
        <p>⏰ ${treatment.time} minutes</p>
        <p>
            <strong>${treatment.price.toFixed(2)} PLN</strong>
        </p>
    `;

  return article;
}
