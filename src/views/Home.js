import "./home.scss";

export function Home() {
  const section = document.createElement("section");
  const img = document.createElement("img");

  img.src = require("../assets/lobby-img.jpg");
  section.innerHTML = `
<p>Witaj w Chill & Relax SPA. Każdy programista lubi u nas odpoczywać.</p>
    `;

  section.append(img);
  return section;
}
