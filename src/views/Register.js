import { Home } from "../views/Home";
import { Login } from "../views/Login";

const axios = require("axios");

export function Register() {
  const section = document.createElement("section");
  section.classList.add("register__section");
  section.innerHTML = `
  <header>
    <h2 class="text-center my-3">Rejestracja</h2>
  </header>
  <div class="form-container"></div>
  <p class="alert alert-danger" role="alert">Istnieje już konto z takim adresem email.</p>
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
      <small id="passwordHelp" class="form-text text-muted">Hasło musi mieć min. 8 znaków, jedną dużą literę, jedną małą literę, cyfrę oraz znak specjalny.</small>
    </div>
    <div class="form-group confirm-password-wrapper my-2">
      <label for="confirmPassword">Potwierdź hasło</label>
      <input type="password" class="form-control" id="confirmPassword" placeholder="Potwierdź hasło" required>
      <div class="invalid-feedback"></div>
    </div>
    <div class="login-link">Wróć do strony logowania</div>
    <button type="submit" id="register" class="btn btn-primary my-3">Zarejstruj się</button>`;

  section.querySelector(".form-container").append(form);

  const passwordInput = section.querySelector("#password");
  const emailInput = section.querySelector("#email");
  const confirmPasswordInput = section.querySelector("#confirmPassword");
  const submitBtn = section.querySelector("#register");
  let validPassword = false;
  let validConfirmPassword = false;
  let validEmail = false;

  passwordInput.addEventListener("input", () => {
    const isProgressBar = section.querySelector(".progress-wrapper")
      ? true
      : false;
    if (isProgressBar) {
      section.querySelector(".password-wrapper").lastElementChild.innerHTML =
        "";
    }

    const strengthMeter = document.createElement("div");
    strengthMeter.classList.add("progress-wrapper");
    strengthMeter.innerHTML = `
    <div class="progress my-2">
      <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    </div>`;

    section.querySelector(".password-wrapper").append(strengthMeter);

    let strength = 0;
    passwordInput.classList.remove("is-valid");
    passwordInput.classList.remove("is-invalid");
    const passwordValue = passwordInput.value;
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (passwordValue.length > 12) {
      strength++;
    }

    if (passwordValue.match(/[A-Z]/)) {
      strength++;
    }

    if (passwordValue.match(/[0-9]/)) {
      strength++;
    }

    if (passwordValue.match(/([!@#$%^&*_])/)) {
      strength++;
    }

    const progressBar = strengthMeter.querySelector(".progress-bar");
    progressBar.classList.remove(
      "bg-success",
      "bg-info",
      "bg-warning",
      "bg-danger"
    );

    switch (strength) {
      case 1:
        progressBar.style.width = "25%";
        progressBar.setAttribute("aria-valuenow", "25%");
        progressBar.classList.add("bg-danger");
        break;
      case 2:
        progressBar.style.width = "50%";
        progressBar.setAttribute("aria-valuenow", "50%");
        progressBar.classList.add("bg-warning");
        break;
      case 3:
        progressBar.style.width = "75%";
        progressBar.setAttribute("aria-valuenow", "75%");
        progressBar.classList.add("bg-info");
        break;
      case 4:
        progressBar.style.width = "100%";
        progressBar.setAttribute("aria-valuenow", "100%");
        progressBar.classList.add("bg-success");
        break;
    }

    if (passwordValue.match(passwordRegex)) {
      passwordInput.classList.add("is-valid");
      validPassword = true;
    } else {
      validPassword = false;
      passwordInput.classList.add("is-invalid");
    }
  });

  confirmPasswordInput.addEventListener("input", () => {
    confirmPasswordInput.classList.remove("is-invalid");
    if (passwordInput.value === confirmPasswordInput.value) {
      confirmPasswordInput.classList.add("is-valid");
      validConfirmPassword = true;
    } else {
      confirmPasswordInput.classList.add("is-invalid");
      validConfirmPassword = false;
    }
  });

  emailInput.addEventListener("input", () => {
    emailInput.classList.remove("is-invalid");
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (emailInput.value.match(emailRegex) && emailInput.value !== "") {
      emailInput.classList.add("is-valid");
      validEmail = true;
    } else {
      validEmail = false;
    }
  });

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (validEmail && validPassword && validConfirmPassword) {
      axios.get("http://localhost:3000/users").then((response) => {
        const existedUser = response.data.find(
          (item) => item.email === emailInput.value
        );

        if (existedUser) {
          const alertMessage = document.querySelector(".alert-danger");
          alertMessage.style.display = "flex";

          setTimeout(() => {
            alertMessage.style.display = "none";
            section.querySelector(
              ".password-wrapper"
            ).lastElementChild.innerHTML = "";
          }, 2000);
        } else {
          const newUser = {
            email: emailInput.value,
            password: passwordInput.value,
          };
          axios
            .post("http://localhost:3000/users", newUser)
            .then(function (response) {
              emailInput.value = "";
              const main = document.querySelector("main");
              main.innerHTML = "";
              main.append(Home());
            })
            .catch(function (error) {
              console.log(error.toJSON());
            });
        }

        passwordInput.value = "";
        confirmPasswordInput.value = "";

        emailInput.classList.remove("is-valid");
        passwordInput.classList.remove("is-valid");
        confirmPasswordInput.classList.remove("is-valid");
        section.querySelector(".password-wrapper").lastElementChild.innerHTML =
          "";
      });
    } else {
      emailInput.classList.add("is-invalid");
      passwordInput.classList.add("is-invalid");
      confirmPasswordInput.classList.add("is-invalid");
    }
  });

  const loginLink = form.querySelector(".login-link");
  loginLink.addEventListener("click", () => {
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.append(Login());
  });
  return section;
}
