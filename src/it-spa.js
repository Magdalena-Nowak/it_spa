import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./it-spa.scss";
import { Home } from "./views/Home";
import { Navigation } from "./navigation/Navigation";

const main = document.querySelector("main");
const navigation = document.querySelector("header");
navigation.classList.add("container");
navigation.append(Navigation());

main.append(Home());
document.body.addEventListener("navigate", (event) => {
  const { detail: Component } = event;
  main.innerHTML = "";
  main.append(Component());
});
