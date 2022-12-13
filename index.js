
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
