import {
  Button
} from "../common/Button";
import {
  RoomDetails
} from "./RoomDetails";
import {
  AddToCartButton
} from "../common/AddToCartButton";
import executive from "../assets/executive.jpg";
import grand from "../assets/grand.jpg";
import junior from "../assets/junior.jpg";
import senior from "../assets/senior.jpg";
import standard from "../assets/standard.jpg";
import studio from "../assets/studio.jpg";
import superior from "../assets/superior.jpg";
import axios from "axios";

export function RoomsListItem(room) {
  const imageImports = [
    executive,
    grand,
    junior,
    senior,
    standard,
    studio,
    superior,
  ];

  const div = document.createElement("div");
  div.classList.add("room");
  div.innerHTML = `
  <div class="popup_wrapper"></div>
    <div class="room__img-wrapper my-3">
      <img class="room__img">
    </div>
    <div class="my-3">
      <h4 class="room__title">${room.name}</h4>
      <p>
        <strong>${room.price.toFixed(2)} zł / noc</strong>
      </p>
      <p>Powierzchnia: ${room.property.area} m<sup>2</sup></p>
      <p>Balkon / Taras: ${room.property.balcony} </p>
    </div>
  </div>
  <div class="room__action-btns my-3"></div>`;

  const img = div.querySelector(".room__img");
  const nameToArr = room.name.split(" ");
  const nameToLower = nameToArr[1].toLowerCase();

  imageImports.forEach((image) => {
    if (image.match(nameToLower)) {
      img.src = image;
    }
  });

  div.querySelector(".room__action-btns").append(
    Button({
      text: "Sprawdź szczegóły",
      classes: "btn btn-primary my-3 py-2 px-3",
      onClick: () => {
        const customEvent = new CustomEvent("navigate", {
          detail: () => RoomDetails(room.id),
        });
        document.body.dispatchEvent(customEvent);
      },
    }),
    Button({
      text: "Sprawdź dostępność",
      classes: "btn btn-secondary my-3 py-2 px-3",
      onClick: () => {
        openPopupBox();
      }
    })
  );

  // checkAvailabilityBtn.addEventListener('click', (event) => {
  const openPopupBox = () => {

    const popup = document.createElement('div');
    popup.classList.add("check-availability__popup");
    popup.innerHTML = `
    <form class="d-flex flex-column align-center">
      <div class="my-1 d-flex flex-column">
        <label class="form-label" for="arrival">Data przyjazdu:</label>
        <input class="arrival-date" type="date" id="arrival" required>
        <p class="error-message"></p>
      </div>
      <div class="my-1 d-flex flex-column">
        <label class="form-label" for="departure">Data wyjazdu:</label>
        <input class="departure-date" type="date" id="departure" required>
        <p class="error-message"></p>
      </div>
      <div class="my-1 d-flex flex-column">
        <label class="form-label" for="people">Liczba osób</label>
        <input class="people-number" type="number" id="people" min="1" max=${room.property.guests} value="1">
        <p class="error-message"></p>
      </div>
      <div class="show-available"></div>
      <div class="form-btns my-2 d-flex justify-content-between">
      </div>
    </form>`

    const btnsWrapper = popup.querySelector('.form-btns');
    btnsWrapper.append(Button({
      text: "Sprawdź",
      classes: "btn btn-dark check-aviability my-2 py-2 px-4",
      onClick: () => {
        checkAvaiability();
      },
    }), Button({
      text: "Zamknij",
      classes: "btn btn-dark close-popup my-2 py-2 px-4",
      onClick: () => {
        closePopup();
      }
    }))

    div.querySelector(".popup_wrapper").append(popup);

    const allInputs = [...div.querySelectorAll('input')];
    allInputs.forEach(input => {
      input.addEventListener('input', () => {
        const errorMessage = input.parentElement.querySelector('.error-message');
        errorMessage.textContent = "";
      })
    })
  }

  const closePopup = () => {
    div.querySelector('.popup_wrapper').innerHTML = "";
  }

  const checkInputs = () => {
    const allInputs = [...div.querySelectorAll('input')];
    let isDepartureValid = true;
    let isArrivalValid = true;

    allInputs.forEach(input => {
      const errorMessage = input.parentElement.querySelector('.error-message');

      if (!input.value) {
        errorMessage.textContent = "Uzupełnij pole";
        isArrivalValid = false;
      } else {
        const currentDate = new Date();
        const date = new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`);
        const arrivalDate = new Date(allInputs[0].value);
        const departureDate = new Date(allInputs[1].value);
        const yearLater = new Date(
          arrivalDate.getFullYear() + 1,
          arrivalDate.getMonth(),
          arrivalDate.getDate());

        if (input.classList.contains("arrival-date") && arrivalDate <= date) {
          errorMessage.textContent = "Data przyjazdu nie może być wcześniejsza od aktualnej daty";
          isArrivalValid = false;
        }

        if (input.classList.contains("departure-date") && departureDate < arrivalDate) {
          errorMessage.textContent = "Data wyjazdu musi być póżniejsza od daty przyjazdu";
          isDepartureValid = false;
        }

        if (input.classList.contains("departure-date") && departureDate > yearLater) {
          errorMessage.textContent = "Data wyjazdu musi być póżniejsza od daty przyjazdu";
          isDepartureValid = false;
        }
      }
    })

    if (isDepartureValid && isArrivalValid) {
      axios.get("http://localhost:3000/booked").then((response => {
        const bookedRoom = response.data.filter(booked => booked.roomId === room.id);
        const btnsWrapper = div.querySelector('.form-btns');
        const showAvailable = div.querySelector('.show-available');

        if (bookedRoom.length === 0) {
          showAvailable.innerHTML =
            `<p class="alert alert-success" role="alert">${room.name}  jest dostępnym w podanym terminie.</p>`;
          btnsWrapper.innerHTML = "";
          btnsWrapper.append(AddToCartButton(room, "Rezerwuj", "btn btn-dark book-room my-2 py-2 px-4"), Button({
            text: "Zamknij",
            classes: "btn btn-dark close-popup my-2 py-2 px-4",
            onClick: () => {
              closePopup();
            },
          }));

          allInputs.forEach(input => {
            input.setAttribute('disabled', 'true');
          })
        } else {
          bookedRoom.forEach(data => {
            const bookedStartDate = new Date(data.startDate);
            const bookedEndDate = new Date(data.endDate);
            const arrivalDate = new Date(allInputs[0].value);
            showAvailable.innerHTML = "";

            if (arrivalDate >= bookedStartDate && arrivalDate <= bookedEndDate) {
              showAvailable.innerHTML = `<p class="alert alert-warning" role="alert">${room.name} nie jest dostępny w podanym terminie.</p>`;
              btnsWrapper.innerHTML = "";
              btnsWrapper.append(Button({
                text: "Sprawdź",
                classes: "btn btn-dark check-aviability my-2 py-2 px-4",
                onClick: () => {
                  checkAvaiability();
                },
              }), Button({
                text: "Zamknij",
                classes: "btn btn-dark my-2 py-2 px-4",
                onClick: () => {
                  closePopup();
                }
              }), )
            } else {
              showAvailable.innerHTML = `<p class="alert alert-success" role="alert">${room.name} jest dostępny w podanym terminie.</p>`;
              btnsWrapper.innerHTML = "";
              btnsWrapper.append(AddToCartButton(room, "Rezerwuj", "btn btn-dark book-room my-2 py-2 px-4"));
              btnsWrapper.append(Button({
                text: "Zamknij",
                classes: "btn btn-dark my-2 py-2 px-4",
                onClick: () => {
                  closePopup();
                },
              }));

              allInputs.forEach(input => {
                input.setAttribute('disabled', 'true');
              })
            }
          })
        }
      }));
    }
  }

  const checkAvaiability = () => {
    checkInputs();
  }

  return div;
}