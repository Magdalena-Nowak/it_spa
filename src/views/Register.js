import "./register.scss";

export function Register() {
  let validEmail = false;
  let validPassword = false;
  let validConfirmPassword = false;
  const section = document.createElement("section");

  const registerWrapper = document.createElement("div");
  registerWrapper.classList.add("register-wrapper");

  const registerBox = document.createElement("div");
  registerBox.classList.add("register-box");

  const form = document.createElement("form");
  form.classList.add("form");

  const title = document.createElement("h3");
  title.classList.add("my-3");
  title.textContent = "Rejestracja";

  const emailWrapper = document.createElement("div");
  emailWrapper.classList.add("form-group", "my-2", "needs-validation");

  const emailLabel = document.createElement("label");
  emailLabel.classList.add("my-1");
  emailLabel.setAttribute("for", "email");
  emailLabel.textContent = "E-mail";

  const emailInput = document.createElement("input");
  emailInput.classList.add("form-control");
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("id", "email");
  emailInput.setAttribute("placeholder", "E-mail");
  emailInput.setAttribute("requaired", "true");

  const emailAlert = document.createElement("p");
  emailAlert.classList.add("error-message", "p-1", "my-2");
  emailAlert.setAttribute("id", "email-alert");

  emailWrapper.append(emailLabel, emailInput, emailAlert);

  const passwordWrapper = document.createElement("div");
  passwordWrapper.classList.add("form-group", "my-2");

  const passwordLabel = document.createElement("label");
  passwordLabel.classList.add("my-1");
  passwordLabel.setAttribute("for", "password");
  passwordLabel.textContent = "Password";

  const passwordInput = document.createElement("input");
  passwordInput.classList.add("form-control");
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("id", "password");
  passwordInput.setAttribute("placeholder", "Hasło");
  passwordInput.setAttribute("requaired", "true");

  const passwordAlert = document.createElement("p");
  passwordAlert.classList.add("error-message", "p-1", "m-2");
  passwordAlert.setAttribute("id", "password-alert");

  passwordWrapper.append(passwordLabel, passwordInput, passwordAlert);

  const confirmPasswordWrapper = document.createElement("div");
  confirmPasswordWrapper.classList.add("form-group", "my-2");

  const confirmPasswordLabel = document.createElement("label");
  confirmPasswordLabel.classList.add("my-1");
  confirmPasswordLabel.setAttribute("for", "confirmPassword");
  confirmPasswordLabel.textContent = "Potwierdź hasło";

  const confirmPasswordInput = document.createElement("input");
  confirmPasswordInput.classList.add("form-control");
  confirmPasswordInput.setAttribute("type", "password");
  confirmPasswordInput.setAttribute("id", "confirm-password");
  confirmPasswordInput.setAttribute("placeholder", "Powtórz hasło");
  confirmPasswordInput.setAttribute("requaired", "true");

  const confirmPasswordAlert = document.createElement("p");
  confirmPasswordAlert.classList.add("error-message", "p-1", "my-2");
  confirmPasswordAlert.setAttribute("id", "confirm-password-alert");

  confirmPasswordWrapper.append(
    confirmPasswordLabel,
    confirmPasswordInput,
    confirmPasswordAlert
  );

  const registerBtn = document.createElement("button");
  registerBtn.classList.add("btn", "my-2");
  registerBtn.textContent = "Zarejstruj się";

  emailInput.addEventListener("input", () => {
    emailInput.classList.remove("is-valid");
    emailInput.classList.remove("is-invalid");
    const emailValue = emailInput.value;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailValue.toLowerCase().match(emailRegex)) {
      emailAlert.style.display = "none";
      emailInput.classList.add("is-valid");
      validEmail = true;
    } else {
      emailInput.classList.add("is-invalid");
      emailAlert.textContent = "Nieprawidłowy adres e-mail";
      emailAlert.style.display = "block";
    }
  });

  passwordInput.addEventListener("input", () => {
    if (passwordWrapper.querySelector(".progress-wrapper")) {
      passwordWrapper.lastElementChild.innerHTML = "";
    }

    const strengthMeter = document.createElement("div");
    strengthMeter.classList.add("progress-wrapper");
    strengthMeter.innerHTML = `<div class="progress mt-2">
  <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
</div>`;

    passwordWrapper.append(strengthMeter);

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

    const progressBar = strengthMeter.firstElementChild.firstElementChild;
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
      passwordAlert.style.display = "none";
      passwordInput.classList.add("is-valid");
      validPassword = true;
    } else {
      passwordInput.classList.add("is-invalid");
      passwordAlert.textContent =
        "Hasło musi mieć min. 8 znaków, w tym małą literę, wielką literę, cyfrę oraz znak specjalny(!@#$%^&*_)";
      passwordAlert.style.display = "block";
    }
  });

  confirmPasswordInput.addEventListener("input", () => {
    confirmPasswordInput.classList.remove("is-valid");
    confirmPasswordInput.classList.remove("is-invalid");
    const passwordValue = passwordInput.value;
    const confirmPasswordValue = confirmPasswordInput.value;
    if (passwordValue === confirmPasswordValue) {
      confirmPasswordAlert.style.display = "none";
      confirmPasswordInput.classList.add("is-valid");
      validConfirmPassword = true;
    } else {
      confirmPasswordInput.classList.add("is-invalid");
      confirmPasswordAlert.textContent = "Hasła nie są zgodne";
      confirmPasswordAlert.style.display = "block";
    }
  });

  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (validEmail && validPassword && validConfirmPassword) {
      console.log("submit");
    } else {
      console.log("error");
    }
  });

  form.append(
    title,
    emailWrapper,
    passwordWrapper,
    confirmPasswordWrapper,
    registerBtn
  );
  registerBox.append(form);
  registerWrapper.append(registerBox);
  section.append(registerWrapper);
  return section;
}
