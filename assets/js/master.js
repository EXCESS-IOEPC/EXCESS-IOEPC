var n = 1;
function darkmode() {
  if (n%2) {
    // lighttheme
    document.body.style.setProperty('--bodybg', '#f6f6f6');
    document.body.style.setProperty('--txt', 'black');
    document.body.style.setProperty('--txt2', 'white');
    document.body.style.setProperty('--navbar', '#F7EF81');
    document.body.style.setProperty('--hoverbg', '#141414');
    document.body.style.setProperty('--navtxt', 'black');
    document.body.style.setProperty('--darkopacity', 0);
    document.body.style.setProperty('--lightopacity', 1);
    document.body.style.setProperty('--abg', '#CFE795');
    document.body.style.setProperty('--bbg', '#A7D3A6');
    n = n-1;
  } else {
    // Darktheme
    document.body.style.setProperty('--bodybg', '#141414');
    document.body.style.setProperty('--txt', 'white');
    document.body.style.setProperty('--txt2', 'black');
    document.body.style.setProperty('--navbar', '#141414');
    document.body.style.setProperty('--hoverbg', '#F7EF81');
    document.body.style.setProperty('--navtxt', 'white');
    document.body.style.setProperty('--darkopacity', 1);
    document.body.style.setProperty('--lightopacity', 0);
    document.body.style.setProperty('--abg', '#141414');
    document.body.style.setProperty('--bbg', '#141414');
    n = n+1;
  }

}
