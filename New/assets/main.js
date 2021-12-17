function load() {
  document.body.classList.add("darkmode");
  if (localStorage.darkmode == "true") localStorage.darkmode = "false";
  else localStorage.darkmode = "true";
  darkmode();
}

function darkmode() {
  if (localStorage.darkmode == "false") {
    // Darktheme
    document.body.classList.add("darkmode");
    localStorage.darkmode = "true";
  }
  else {
    // lighttheme
    document.body.classList.toggle("darkmode");
    localStorage.darkmode = "false";
  }
}