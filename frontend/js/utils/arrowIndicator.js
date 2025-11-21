export function setArrowIndicator(elem, value) {
  elem.classList.remove("arrow-up", "arrow-down", "arrow-none");

  if (value > 0) {
    elem.textContent = "▲";
    elem.classList.add("arrow-up");
  } else if (value < 0) {
    elem.textContent = "▼";
    elem.classList.add("arrow-down");
  } else {
    elem.textContent = "•";
    elem.classList.add("arrow-none");
  }
}

export function setArrowIndicatorF(elem, value) {
  elem.classList.remove("arrow-up", "arrow-down", "arrow-none");

  if (value === "up") {
    elem.textContent = "▲";
    elem.classList.add("arrow-up");
  } else if (value === "down") {
    elem.textContent = "▼";
    elem.classList.add("arrow-down");
  } else {
    // default to "stable"
    elem.textContent = "•";
    elem.classList.add("arrow-none");
  }
}
