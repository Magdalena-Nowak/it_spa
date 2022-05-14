const axios = require('axios');

export function Reservation() {

  const section = document.createElement("section");
  section.innerHTML = `<form>
  <div>
  <label class="form-label" for="arrival">Data przyjazdu:</label>
  <input class="arrival-date" type="date" id="arrival" required>
  <p class="invalid-feedback">
 Uzupełnij datę przyjazdu</p>
</div>
<div>
  <label class="form-label" for="departure">Data wyjazdu:</label>
  <input class="departure-date" type="date" id="departure" required>
  <p class="invalid-feedback">
  Uzupełnij datę wyjazdu</p>
</div>
<div>
  <label class="form-label" for="people">Liczba osób</label>
  <input class="people-number" type="number" id="people" min="1" max="4" value="1">
</div>
  <button type="submit" class="btn btn-dark check-aviability">Sprawdź dostępność</button>
</form>`

  const submitBtn = section.querySelector('.check-aviability');

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const arrivalInput = section.querySelector('.arrival-date').value;
    const departureInput = section.querySelector(".departure-date").value;
    const numberOfPeople = section.querySelector('.people-number').value;

    const currentDate = new Date();
    const arrivalDate = new Date(arrivalInput);
    const departureDate = new Date(departureInput);

    if (arrivalInput !== "" && departureInput !== "") {
      if (arrivalDate >= currentDate) {
        const yearLater = new Date(
          arrivalDate.getFullYear() + 1,
          arrivalDate.getMonth(),
          arrivalDate.getDate())
        if (departureDate < yearLater) {
          //sprawdzenie w database czy pokoje są wolne, pokój musi mieć wystarczającą ilość gości
          console.log('mogę zrobić rezerwację')

          axios.get("http://localhost:3000/rooms").then((response) => {
            const matchBeds = response.data.filter(item => {
              if (item.property.guests >= numberOfPeople) {
                return item;
              }
            })

            const availableRooms = matchBeds.filter(item => {
              return (item.quantity - item.booked) > 0 ? item : null
            })

            if (!availableRooms) {
              console.log('nie mamy dostępnych pokoi');
            } else {
              availableRooms.forEach(room => {

              })
            }
          })
        } else {
          console.log('data wyjazdu nie może być dłuższa niż rok od przyjazdu')
        }
      } else {
        console.log('data przyjazdu nie może być wcześniejsza od daty dzisiejszej');
      }
    } else {
      console.log("uzupełnij pola");
    }
  });

  return section;
}