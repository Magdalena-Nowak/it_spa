import { Home } from "../views/Home";
import { Register } from "./Register";
const axios = require("axios");

export function Login() {
  const section = document.createElement("section");
  section.classList.add("login__section");

  section.innerHTML = `
  <header>
    <h2 class="text-center my-3">Logowanie</h2>
  </header>
  <div class="form-container"></div>
  <div class="login-popup-bg">
    <div class="login-popup">
      <h5>coś poszło nie tak</h5>
      <p>Nie można się zalogować na podane dane.</p>
      <i class="fa-solid fa-x"></i>
    </div>
  </div>
  `;

  const form = document.createElement("form");
  form.classList.add(
    "needs-validation",
    "d-flex",
    "flex-column",
    "justify-content-center"
  );

  form.innerHTML = `
    <div class="form-group my-2">
      <label for="email">Email</label>
      <input type="email" class="form-control" id="email" placeholder="Wpisz email" required>
    </div>
    <div class="form-group password-wrapper my-2">
      <label for="password">Hasło</label>
      <input type="password" class="form-control" id="password" placeholder="Wpisz hasło" required>
    </div>
    <div>
      <p>Jesteś tu perwszy raz? <span class="register-link">Zarejstruj się</span></p>
    </div>
    <button type="submit" id="register" class="btn btn-primary my-3">Zaloguj się</button>`;

  section.querySelector(".form-container").append(form);

  const submitBtn = section.querySelector("#register");
  const passwordInput = section.querySelector("#password");
  const emailInput = section.querySelector("#email");

  emailInput.addEventListener("input", () => {
    if (emailInput.value !== "") {
      emailInput.classList.remove("is-invalid");
    }
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.value !== "") {
      passwordInput.classList.remove("is-invalid");
    }
  });

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (passwordInput.value !== "" && emailInput.value !== "") {
      axios.get("http://localhost:3000/users").then((response) => {
        let currentPassword = false;
        const currentUser = response.data.find(
          (item) => item.email === emailInput.value
        );

        console.log("currentUser", currentUser);
        if (currentUser) {
          currentPassword =
            currentUser.password === passwordInput.value ? true : false;
        }

        console.log("currentPassword", currentPassword);

        if (currentUser || currentPassword) {
          emailInput.value = "";
          const main = document.querySelector("main");
          main.innerHTML = "";
          main.append(Home());
        } else {
          const loginPopup = document.querySelector(".login-popup-bg");
          loginPopup.style.display = "flex";
          const closeBtn = loginPopup.querySelector("i");
          closeBtn.addEventListener("click", () => {
            loginPopup.style.display = "none";
          });
        }
      });
    } else {
      passwordInput.classList.add("is-invalid");
      emailInput.classList.add("is-invalid");
    }
  });

  const registerLink = form.querySelector(".register-link");

  registerLink.addEventListener("click", () => {
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.append(Register());
  });

  return section;
}
