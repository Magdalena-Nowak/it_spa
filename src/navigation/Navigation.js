import { Home } from "../views/Home";
import { RoomsList } from "../views/RoomsList";
import { Button } from "../common/Button";
import "./navigation.scss";
import { TreatmentsList } from "../views/TreatmentsList";
import { Cart } from "../views/Cart";

const navItems = [
  { name: "Home", component: Home },
  { name: "Rooms", component: RoomsList },
  { name: "Treatments", component: TreatmentsList },
  { name: "Cart", component: Cart },
];

export function Navigation() {
  const navigation = document.createElement("nav");

  const navButtons = navItems.map((item) => {
    return Button({
      text: item.name,
      classes: "btn btn-warning mx-3 my-4",
      onClick: (event) => {
        const allBtns = event.target.parentElement.children;
        Array.from(allBtns).forEach((element) =>
          element.classList.remove("btn-active")
        );

        event.target.classList.add("btn-active");
        const customEvent = new CustomEvent("navigate", {
          detail: item.component,
        });

        document.body.dispatchEvent(customEvent);
      },
    });
  });

  navButtons[0].classList.add("btn-active");
  navigation.append(...navButtons);
  return navigation;
}
