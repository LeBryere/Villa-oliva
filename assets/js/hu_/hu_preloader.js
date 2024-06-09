/************************************************************************\
                                 Preload
\************************************************************************/
// Az 'preloader' azonosítójú elem átlátszóságának beállítása 1-re
document.getElementById("preloader").style.opacity = 1;
// Az 'preloader' azonosítójú elem átlátszóságának átmeneti effektusának beállítása 700ms-re
document.getElementById("preloader").style.transition = "opacity 700ms";

setTimeout(function () {
   // Az 'preloader' azonosítójú elem átlátszóságának beállítása 0-ra
   document.getElementById("preloader").style.opacity = 0;
   setTimeout(function () {
      // Az 'preloader' azonosítójú elem megjelenítésének kikapcsolása
      document.getElementById("preloader").style.display = "none";
   }, 500);
}, 500);

// Az 'preloader' osztályú elem átlátszóságának beállítása 1-re
document.getElementsByClassName("preloader")[0].style.opacity = 1;
// Az 'preloader' osztályú elem átlátszóságának átmeneti effektusának beállítása 500ms-re
document.getElementsByClassName("preloader")[0].style.transition = "opacity 500ms";

setTimeout(function () {
   // Az 'preloader' osztályú elem átlátszóságának beállítása 0-ra
   document.getElementsByClassName("preloader")[0].style.opacity = 0;
   setTimeout(function () {
      // Az 'preloader' osztályú elem megjelenítésének kikapcsolása
      document.getElementsByClassName("preloader")[0].style.display = "none";
   }, 500);
}, 500);
