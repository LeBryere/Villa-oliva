var openPopupButton = document.getElementById("openPopupButton");
var closeButton = document.getElementById("closeButton");
var vid = document.getElementById("leb__bg_vid");
var videoPopup = document.getElementById("videoPopup");
var pauseButton = document.querySelector("#lebVid button");

// A "openPopupButton" gombra kattintás eseményfigyelője a felugró ablak megnyitásához
openPopupButton.addEventListener("click", () => {
   videoPopup.style.display = "flex"; // Felugró ablak megjelenítése
   //"Pause" gomb szövegét pedig "Pause"-ra állítjuk
   vid.paused ? (vid.play(), pauseButton.innerHTML = "||") : null;
});

// A "closeButton" gombra kattintás eseményfigyelője a felugró ablak bezárásához
closeButton.addEventListener("click", () => {
   videoPopup.style.display = "none";// Felugró ablak elrejtése
   vid.pause()
});

pauseButton.addEventListener("click", () => {// A "Pause" gombra kattintás eseményfigyelője
   // Ha a videó szüneteltetve van, elindítjuk a lejátszást, a "Pause" gomb szövegét pedig "Pause"-ra állítjuk
   // Else ág videó lejátszás alatt van, megállítjuk, és a "Pause" gomb szövegét "Play"-ra változtatjuk
   vid.paused ? (vid.play(), pauseButton.innerHTML = "||") : (vid.pause(), pauseButton.innerHTML = "Paly")
});

muteButton.addEventListener("click", () => {// A "muteButton" gombra kattintás eseményfigyelője
   // Az "muted" attribútumot a videóhoz hozzáadjuk vagy eltávolítjuk, ami a hang ki- vagy bekapcsolását jelenti
   vid.muted = !vid.muted;
   // A gomb szövegét megváltoztatjuk a hang állapotától függően
   if (vid.muted) {
      muteButton.innerHTML = "Sound"
      muteButton.style.backgroundColor = "transparent";
      muteButton.style.color = "$design";
   } else {
      muteButton.innerHTML = "Sound"
      muteButton.style.color = "#fff";
   }
});

document.addEventListener("DOMContentLoaded", () => {
   var fullscreenButton = document.getElementById("fullscreenButton");

   (window.matchMedia("(orientation: landscape)").matches) ?
      lebVid.style.top = "3rem" :
      lebVid.style.top = "inherit"; // Visszaállítás alapértelmezett értékre (ne legyen "top" beállítva)

   fullscreenButton.addEventListener("click", () => {
      var lebVid = document.getElementById("lebVid");

      vid.requestFullscreen ?
         vid.requestFullscreen() :
         vid.mozRequestFullScreen ? // Firefox támogatás
            vid.mozRequestFullScreen() :
            vid.webkitRequestFullscreen ? // Chrome, Safari és Opera támogatás
               vid.webkitRequestFullscreen() :
               vid.msRequestFullscreen ? // Internet Explorer támogatás
                  vid.msRequestFullscreen() :
                  null
   });

   // Orientációváltozás eseményfigyelője
   window.addEventListener("orientationchange", () => {
      var lebVid = document.getElementById("lebVid");

      window.matchMedia("(orientation: landscape)").matches ?
         lebVid.style.top = "auto" :
         lebVid.style.top = "3rem"; // Visszaállítás alapértelmezett értékre (ne legyen "top" beállítva)
   });
});
