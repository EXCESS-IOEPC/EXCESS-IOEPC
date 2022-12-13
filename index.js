
window.addEventListener(
  "hashchange",
  () => {
    document.querySelector(".activity").classList.remove("activity");
    document
      .querySelector('[href="' + window.location.hash + '"]')
      .classList.add("activity");
  },
  false
);
navshow = 0;

function navbar() {
  var element = document.body;
  element.classList.toggle("show");
}
