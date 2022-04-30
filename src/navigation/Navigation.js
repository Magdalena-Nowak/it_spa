import { Home } from "../views/Home";
import { RoomsList } from "../views/RoomsList";
import { Button } from "../common/Button";
import { TreatmentsList } from "../views/TreatmentsList";
import { Cart } from "../views/Cart";
import { Calendar } from "../views/Calendar";
import { Login } from "../views/Login";

const navItems = [
  { name: "Home", component: Home },
  { name: "Pokoje", component: RoomsList },
  { name: "Zabiegi", component: TreatmentsList },
  { name: "Koszyk", component: Cart },
  { name: "Kalendarz", component: Calendar },
  { name: `<i class="fa-solid fa-user"></i>`, component: Login },
];

export function Navigation() {
  const navigation = document.createElement("nav");
  navigation.classList.add(
    "navbar",
    "navbar-expand-lg",
    "navbar-light",
    "bg-light"
  );
  navigation.innerHTML = `
  <a class="navbar-brand" href="#"><h1 class="brand">IT Spa</h1></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
    </ul>
  </div>
  `;

  const navButtons = navItems.map((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("nav-item");

    listItem.append(
      Button({
        text: item.name,
        classes: "mx-3 my-4 btn",
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

  const navbarList = navigation.querySelector(".navbar-nav");
  navbarList.append(...navButtons);

  return navigation;
}
