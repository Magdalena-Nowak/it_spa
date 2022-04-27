const axios = require("axios");

export function Register() {
  const section = document.createElement("section");
  section.classList.add("main-section");

  section.innerHTML = `<header>
  <h2>Rejestracja</h2>
  <div class="form-container"></div>
  </header>`;

  const form = document.createElement("form");
  form.innerHTML = `
  <form class="was-validated">
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" placeholder="Wpisz email" required>
  </div>
  <div class="form-group password-wrapper">
    <label for="password">Hasło</label>
    <input type="password" class="form-control" id="password" placeholder="Wpisz hasło" required>
    <small id="passwordHelp" class="form-text text-muted">Hasło musi mieć min. 8 znaków, jedną dużą literę, jedną małą literę, cyfrę oraz znak specjalny.</small>
  </div>
  <div class="form-group confirm-password-wrapper">
    <label for="confirmPassword">Potwierdź hasło</label>
    <input type="password" class="form-control" id="confirmPassword" placeholder="Potwierdź hasło" required>
    <div class="invalid-feedback">Hasła nie są zgodne.</div>
  </div>
  <button type="submit" id="register" class="btn btn-primary">Submit</button>
</form>`;

  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `<p class="alert alert-danger" role="alert">Istnieje już konto z takim adresem email.</p>`;
  // container.classList.add("popup-container");
  // container.innerHTML = `<div class="popup card">
  //       <p class="alert alert-danger" role="alert">Istnieje już konto z takim adresem email.</p>
  //       </div>`;

  section.append(popup);
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
    strengthMeter.innerHTML = `<div class="progress mt-2">
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
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (emailInput.value.match(emailRegex) && emailInput.value !== "") {
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
          popup.style.display = "flex";

          setTimeout(() => {
            popup.style.display = "none";
            passwordInput.value = "";
            confirmPasswordInput.value = "";
            section.querySelector(
              ".password-wrapper"
            ).lastElementChild.innerHTML = "";
          }, 2000);
        } else {
          const newUser = {
            email: emailInput.value,
            password: passwordInput.value,
          };
        }

        passwordInput.value = "";
        confirmPasswordInput.value = "";
        section.querySelector(".password-wrapper").lastElementChild.innerHTML =
          "";
      });
    }
  });

  return section;
}
