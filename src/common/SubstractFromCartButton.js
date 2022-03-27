import { Button } from "./Button";
import { cartManager } from "../cart/cart-manager";
import { Cart } from "../views/Cart";

export function SubstractFromCartButton(item, text, classes) {
  return Button({
    text,
    classes,
    onClick: () => {
      cartManager.substractItem(item);
      const customEvent = new CustomEvent("navigate", {
        detail: Cart,
      });
      document.body.dispatchEvent(customEvent);
    },
  });
}
