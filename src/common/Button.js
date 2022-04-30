export function Button(options) {
  const { text = "", classes = "", onClick = () => {} } = options;

  const button = document.createElement("button");

  button.setAttribute("type", "button");
  button.innerHTML = text;
  button.className = classes;
  button.addEventListener("click", onClick);

  return button;
}
