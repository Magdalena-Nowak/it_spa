import axios from "axios";
import {
  Button
} from "./Button";
import {
  cartManager
} from "../cart/cart-manager";

export function AddToCartButton(item, text, classes) {
  return Button({
    text,
    classes,
    onClick: (event) => {
      cartManager.addItem(item);

      if (event.target.classList.contains("book-room")) {
        const formWrapper = event.target.closest('.check-availability__popup');
        const bookedDates = {
          roomId: item.id,
          startDate: formWrapper.querySelector('.arrival-date').value,
          endDate: formWrapper.querySelector('.departure-date').value
        }

        axios
          .post("http://localhost:3000/booked", bookedDates)
          .then(function(response) {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          });

        event.target.closest('.popup_wrapper').innerHTML = "";
      }

    },
  });
}