export function Login() {
  const section = document.createElement("section");

  const loginWrapper = document.createElement("div");
  loginWrapper.classList.add("login-wrapper");

  const loginBox = document.createElement("div");
  loginBox.classList.add("login-box");

  loginBox.innerHTML = `<form class="form">
  <h3 class="my-3">Logowanie</h3>
  <div class="form-group my-2">
    <label class="my-1" for="email">E-mail</label>
    <input type="email" class="form-control" id="email" placeholder="E-mail">
  </div>
  <div class="form-group my-2">
    <label class="my-1" for="password">Hasło</label>
    <input type="password" class="form-control" id="password" placeholder="Hasło">
    <p class="forgot-link my-2">Nie pamiętam hasła</p>
  </div>
  <button type="submit" class="btn my-3">Submit</button>
</form>`;

  loginWrapper.append(loginBox);
  section.append(loginWrapper);
  return section;
}
