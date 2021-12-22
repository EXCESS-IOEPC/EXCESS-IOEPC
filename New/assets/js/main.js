function load() { 
  document.body.classList.add("lightmode");
  if (localStorage.lightmode == "true") localStorage.lightmode = "false";
  else localStorage.lightmode = "true";
  lightmode();
}

function lightmode() {
  if (localStorage.lightmode == "false") {
    // lighttheme
    document.body.classList.add("lightmode");
    localStorage.lightmode = "true";
  }
  else {
    // lighttheme
    document.body.classList.toggle("lightmode");
    localStorage.lightmode = "false";
  }
}
