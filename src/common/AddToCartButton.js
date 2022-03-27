import { Button } from "./Button";
import { cartManager } from "../cart/cart-manager";
import { Cart } from "../views/Cart";

export function AddToCartButton(item, text, classes) {
  return Button({
    text,
    classes,
    onClick: () => {
      cartManager.addItem(item);
    },
  });
}
