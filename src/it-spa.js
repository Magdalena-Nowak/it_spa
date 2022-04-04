import "bootstrap/dist/css/bootstrap.css";
import "./it-spa.scss";
import { Home } from "./views/Home";
import { RoomsList } from "./views/RoomsList";
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
