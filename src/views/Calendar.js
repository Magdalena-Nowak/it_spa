import "./calendar.scss";

export function Calendar() {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "styczeń",
    "luty",
    "marzec",
    "kwiecień",
    "maj",
    "czerwiec",
    "lipiec",
    "sierpień",
    "wrzesień",
    "październik",
    "listopad",
    "grudzień",
  ];

  let nav = 0;
  let clicked = null;
  let events = localStorage.getItem("events")
    ? JSON.parse(localStorage.getItem("events"))
    : [];

  const section = document.createElement("section");
  section.classList.add("calendar__wrapper");

  const container = document.createElement("div");
  container.classList.add("calendar__container");

  const header = document.createElement("header");
  header.classList.add("calendar__header");

  const weekdaysWrapper = document.createElement("div");
  weekdaysWrapper.classList.add("calendar__weekdays");

  const titleDate = document.createElement("div");
  titleDate.classList.add("calendar__header-date");

  const titleMonth = document.createElement("p");
  titleMonth.classList.add("calendar__header-date-month");

  const titleYear = document.createElement("p");
  titleYear.classList.add("calendar__header-date-year");

  const next = document.createElement("i");
  next.classList.add("fa-solid", "fa-chevron-right");

  const previous = document.createElement("i");
  previous.classList.add("fa-solid", "fa-chevron-left");

  const body = document.createElement("div");
  body.classList.add("calendar__body");

  function getDates(startDate, stopDate) {
    const dateArray = new Array();
    const currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }
    return dateArray;
  }

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const renederCalendar = () => {
    const dt = new Date();

    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    console.log("year", year);
    weekdaysWrapper.innerHTML = "";
    body.innerHTML = "";

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    titleMonth.innerHTML = dt.toLocaleDateString("en-us", {
      month: "long",
    });
    titleYear.innerHTML = year;

    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    for (let j = 0; j < weekdays.length; j++) {
      const weekDay = document.createElement("div");
      weekDay.classList.add("calendar__body-week");
      weekDay.innerHTML = weekdays[j];

      weekdaysWrapper.append(weekDay);
    }

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const daySquare = document.createElement("div");
      daySquare.classList.add("calendar__body-day");

      if (i > paddingDays) {
        daySquare.innerHTML = i - paddingDays;
        daySquare.setAttribute("date-day", i - paddingDays);

        daySquare.addEventListener("click", (event) => {
          const allDays = event.target.parentElement.children;
          Array.from(allDays).forEach((element) => {
            if (element.classList.contains("end-date")) {
              element.classList.remove("end-date");
            } else if (element.classList.contains("start-date")) {
              event.target.classList.add("end-date");
            } else {
              event.target.classList.add("start-date");
            }
          });

          console.log("day", daySquare);
        });
      } else {
        daySquare.classList.add("padding");
      }

      if (new Date().getMonth() === month && i - paddingDays === day) {
        daySquare.classList.add("current-day");
      }

      titleDate.append(titleMonth, titleYear);
      header.append(previous, titleDate, next);
      body.append(daySquare);
      container.append(header, weekdaysWrapper, body);
    }
  };

  // const initButtons = () => {
  next.addEventListener("click", () => {
    nav++;
    renederCalendar();
  });

  previous.addEventListener("click", () => {
    nav--;
    renederCalendar();
  });
  // };

  renederCalendar();
  section.append(container);

  return section;
}
