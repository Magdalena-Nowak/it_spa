import "./calendar.scss";

export function Calendar() {
  const daysList = ["pon", "wto", "śro", "czw", "pią", "sob", "nie"];

  const section = document.createElement("section");
  section.classList.add("calendar__wrapper");

  const container = document.createElement("div");
  container.classList.add("calendar__container");

  const header = document.createElement("header");
  header.classList.add("calendar__header");

  //   function createHeaderElements() {
  const titleDate = document.createElement("div");
  titleDate.classList.add("calendar__header-date");

  // const titleDay = document.createElement("p");
  // titleDay.classList.add("calendar__header-date-day");
  // titleDay.innerHTML = "10";

  const titleMonth = document.createElement("p");
  titleMonth.classList.add("calendar__header-date-month");
  titleMonth.innerHTML = "kwiecień";

  const titleYear = document.createElement("p");
  titleYear.classList.add("calendar__header-date-year");
  titleYear.innerHTML = "2022";

  const next = document.createElement("i");
  next.classList.add("fa-solid", "fa-chevron-right");

  const previous = document.createElement("i");
  previous.classList.add("fa-solid", "fa-chevron-left");

  titleDate.append(titleMonth, titleYear);
  header.append(previous, titleDate, next);
  //   }

  // function crateBodyElements() {
  const body = document.createElement("div");
  body.classList.add("calendar__body");

  const week = document.createElement("div");
  week.classList.add("calendar__body-week");

  for (let j = 0; j < daysList.length; j++) {
    const weekDay = document.createElement("div");
    weekDay.classList.add("calendar__body-week");
    weekDay.innerHTML = daysList[j];

    body.append(weekDay);
  }

  for (let i = 1; i <= 31; i++) {
    const day = document.createElement("div");
    day.classList.add("calendar__body-day");
    day.innerHTML = i;

    body.append(day);
  }
  // }

  //   createHeaderElements();

  container.append(header, body);

  section.append(container);
  return section;
}
