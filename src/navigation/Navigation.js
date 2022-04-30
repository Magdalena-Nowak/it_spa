import { Home } from "../views/Home";
import { RoomsList } from "../views/RoomsList";
import { Button } from "../common/Button";
import { TreatmentsList } from "../views/TreatmentsList";
import { Cart } from "../views/Cart";
import { Calendar } from "../views/Calendar";
import { Login } from "../views/Login";
import { Register } from "../views/Register";

const navItems = [
  { name: "Home", component: Home },
  { name: "Pokoje", component: RoomsList },
  { name: "Zabiegi", component: TreatmentsList },
  { name: "Koszyk", component: Cart },
  { name: "Kalendarz", component: Calendar },
  { name: "Logowanie", component: Login },
  { name: "Rejestracja", component: Register },
];

export function Navigation() {
  const navigation = document.createElement("nav");
  navigation.classList.add("navbar");
  navigation.classList.add("navbar-expand-lg");
  navigation.classList.add("navbar-light");

  const navbarBrand = document.createElement("div");
  navbarBrand.classList.add("navbar-brand");

  navbarBrand.innerHTML = `<h1 class="brand">IT Spa</h1>`;

  const togglerBtn = document.createElement("button");
  togglerBtn.classList.add("navbar-toggler");
  togglerBtn.setAttribute("type", "button");
  togglerBtn.setAttribute("data-toggle", "collapse");
  togglerBtn.setAttribute("data-target", "#navbarNav");
  togglerBtn.setAttribute("aria-controls", "navbarNav");
  togglerBtn.setAttribute("collapse", "false");

  const togglerIcon = document.createElement("span");
  togglerIcon.classList.add("navbar-toggler-icon");

  togglerBtn.append(togglerIcon);

  const navbarCollapse = document.createElement("div");
  navbarCollapse.classList.add("collapse");
  navbarCollapse.classList.add("navbar-collapse");
  navbarCollapse.setAttribute("id", "navbarNav");

  const navbarList = document.createElement("ul");
  navbarList.classList.add("navbar-nav");
  navbarList.classList.add("mr-auto");

  navbarCollapse.append(navbarList);

  const navButtons = navItems.map((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("nav-item");

    listItem.append(
      Button({
        text: item.name,
        classes: "btn btn-link mx-3 my-4",
        onClick: (event) => {
          const allBtns = event.target.parentElement.parentElement.children;

          Array.from(allBtns).forEach((element) =>
            element.firstElementChild.classList.remove("btn-active")
          );

          event.target.classList.add("btn-active");
          const customEvent = new CustomEvent("navigate", {
            detail: item.component,
          });

          document.body.dispatchEvent(customEvent);
        },
      })
    );
    return listItem;
  });

  navbarBrand.addEventListener("click", (event) => {
    const home = navItems.find((item) => item.name === "Home");
    const customEvent = new CustomEvent("navigate", {
      detail: home.component,
    });
    document.body.dispatchEvent(customEvent);

    const allBtns =
      event.target.parentElement.parentElement.lastElementChild
        .firstElementChild.children;

    Array.from(allBtns).forEach((element, index) => {
      element.firstElementChild.classList.remove("btn-active");

      if (index === 0) {
        element.firstElementChild.classList.add("btn-active");
      }
    });
  });

  navbarList.append(...navButtons);

  navButtons[0].firstElementChild.classList.add("btn-active");
  navigation.append(navbarBrand, togglerBtn, navbarCollapse);
  return navigation;
}
