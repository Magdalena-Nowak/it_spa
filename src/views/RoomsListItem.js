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
        checkAvailability();
        console.log('sprawdź dostępność');
      }
    })
  );


  // const checkAvailabilityBtn = document.createElement("button");
  // checkAvailabilityBtn.classList.add("btn", "btn-secondary", "my-3", "py-2", "px-3");
  // checkAvailabilityBtn.textContent = "Sprawdź dostępność";


  // div.querySelector(".room__action-btns").append(checkAvailabilityBtn);

  // const 

  // checkAvailabilityBtn.addEventListener('click', (event) => {
  const checkAvailability = (event) => {
    const popup = document.createElement('div');
    popup.classList.add("check-availability__popup");
    popup.innerHTML = `
    <form class="d-flex flex-column align-center">
    
  <div class="my-2 d-flex flex-column">
    <label class="form-label" for="arrival">Data przyjazdu:</label>
    <input class="arrival-date" type="date" id="arrival" required>
    <p class="arrival-error"></p>
  </div>
  <div class="my-2 d-flex flex-column">
    <label class="form-label" for="departure">Data wyjazdu:</label>
    <input class="departure-date" type="date" id="departure" required>
    <p class="departure-error"></p>
  </div>
  <div class="my-2 d-flex flex-column">
    <label class="form-label" for="people">Liczba osób</label>
    <input class="people-number" type="number" id="people" min="1" max=${room.property.guests} value="1">
    <p class="people-error"></p>
  </div>
  <div class="show-available"></div>
  <div class="form-btns my-2 d-flex justify-content-between">
    <button type="submit" class="btn btn-dark check-aviability my-2 py-2 px-4">Sprawdź</button>
    <button type="submit" class="btn btn-dark close-popup my-2 py-2 px-4">Zamknij</button>
  </div>
  </form>
`
    const popupWrapper = event.target.parentElement.parentElement.querySelector(".popup_wrapper");
    const closeBtn = popup.querySelector(".close-popup");
    closeBtn.addEventListener('click', () => {
      popupWrapper.innerHTML = "";
    })

    const submitBtn = popup.querySelector('.check-aviability');
    const arrivalInput = popup.querySelector('.arrival-date');
    const departureInput = popup.querySelector(".departure-date");
    const numberOfPeople = popup.querySelector('.people-number');

    arrivalInput.addEventListener('input', (event) => {
      const errorTag = event.target.parentElement.querySelector('.arrival-error');
      errorTag.textContent = "";
    })

    departureInput.addEventListener('input', (event) => {
      const errorTag = event.target.parentElement.querySelector('.departure-error');
      errorTag.textContent = "";
    })

    numberOfPeople.addEventListener('change', (event) => {
      const errorTag = event.target.parentElement.querySelector('.people-error');
      errorTag.textContent = "";
    })

    submitBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const arrivalInput = popup.querySelector('.arrival-date');
      const departureInput = popup.querySelector(".departure-date");
      const numberOfPeople = popup.querySelector('.people-number').value;

      const currentDate = new Date();
      const date = new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`);
      const arrivalDate = new Date(arrivalInput.value);
      const departureDate = new Date(departureInput.value);
      const formBtns = popup.querySelector('.form-btns');
      const inputsWrapper = popup.querySelector('.inputs-wrapper');
      let message = "";
      let isDepartureValid = true;
      let isArrivalValid = true;
      const yearLater = new Date(
        arrivalDate.getFullYear() + 1,
        arrivalDate.getMonth(),
        arrivalDate.getDate())

      const departureError = popup.querySelector('.departure-error');
      const arrivalError = popup.querySelector('.arrival-error');
      const showAvailable = popup.querySelector('.show-available');

      if (arrivalDate <= date) {
        message += "Data przyjazdu nie może być wcześniejsza od aktualnej daty"
        arrivalError.textContent = message;
        isDepartureValid = false;
      }

      if (departureDate < arrivalDate) {
        message += "Data wyjazdu musi być póżniejsza od daty przyjazdu"
        departureError.textContent = message;
        isArrivalValid = false;
      }

      if (departureDate > yearLater) {
        message += "Data wyjazdu nie może przekroczyć roku od przyjazdu"
        departureError.textContent = message;
        isArrivalValid = false;
      }

      if (arrivalInput.value === "") {
        const arrivalError = popup.querySelector('.arrival-error');
        arrivalError.textContent = "Uzupełnij datę przyjazdu";
        isArrivalValid = false;
      }

      if (departureInput.value === "") {
        const departureError = popup.querySelector('.departure-error');
        departureError.textContent = "Uzupełnij datę wyjazdu";
        isDepartureValid = false;
      }

      if (isDepartureValid && isArrivalValid) {
        axios.get("http://localhost:3000/booked").then((response => {
          const bookedRoom = response.data.filter(booked => booked.roomId === room.id);

          if (bookedRoom.length === 0) {
            showAvailable.innerHTML =
              `<p class="alert alert-success" role="alert">${room.name}  jest dostępnym w podanym terminie.</p>`;
            formBtns.innerHTML = "";
            formBtns.append(AddToCartButton(room, "Rezerwuj", "btn btn-dark book-room my-2 py-2 px-4"));
            formBtns.append(Button({
              text: "Zamknij",
              classes: "btn btn-dark close-popup my-2 py-2 px-4",
              onClick: () => {
                popupWrapper.innerHTML = "";
              },
            }));
          } else {
            bookedRoom.forEach(data => {

              const bookedStartDate = new Date(data.startDate);
              const bookedEndDate = new Date(data.endDate);
              showAvailable.innerHTML = "";


              if (arrivalDate >= bookedStartDate && arrivalDate <= bookedEndDate) {
                showAvailable.innerHTML = `<p class="alert alert-warning" role="alert">${room.name} nie jest dostępny w podanym terminie.</p>`;
                formBtns.innerHTML = "";
                formBtns.append(Button({
                  text: "Zamknij",
                  classes: "btn btn-primary my-3 py-2 px-3",
                  onClick: () => {
                    popupWrapper.innerHTML = "";
                  }
                }))
              } else {
                showAvailable.innerHTML = `<p class="alert alert-success" role="alert">${room.name} jest dostępny w podanym terminie.</p>`;
                formBtns.innerHTML = "";
                formBtns.append(AddToCartButton(room, "Rezerwuj", "btn btn-primary book-room my-3 py-2 px-3"));
                formBtns.append(Button({
                  text: "Zamknij",
                  classes: "btn btn-primary my-3 py-2 px-3",
                  onClick: () => {
                    popupWrapper.innerHTML = "";
                  },
                }));
              }
            })
          }
        }))
      }
    });

    popupWrapper.append(popup);
  }

  return div;
}