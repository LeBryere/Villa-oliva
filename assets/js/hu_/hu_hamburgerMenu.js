/************************************************************************\
                                 HAMBURGER MENU
\************************************************************************/
// Az 'nav__icon' azonosítójú elem kiválasztása
var hamIcon = document.getElementById('nav__icon');
hamIcon.addEventListener('click', function () {
   // Az 'leb__aside' azonosítójú elem kiválasztása
   var lebAside = document.getElementById('leb__aside');
   // Az 'nav__icon' azonosítójú elem kiválasztása
   var navIcon = document.getElementById('nav__icon');
   // Az 'nav__on' osztály hozzáadása vagy eltávolítása az 'leb__aside' elemhez
   lebAside.classList.toggle('nav__on');
   // Az 'nav__icon-on' osztály hozzáadása vagy eltávolítása a 'nav__icon' elemhez
   navIcon.classList.toggle('nav__icon-on');
   // A 1. gyermek elem kiválasztása
   nth1 = document.querySelector('span:nth-child(1)');
   // A 'span_1-clicked' osztály hozzáadása vagy eltávolítása az elemhez
   nth1.classList.toggle('span_1-clicked');
   // A 2. gyermek elem kiválasztása
   nth2 = document.querySelector('span:nth-child(2)');
   // A 'span_2-clicked' osztály hozzáadása vagy eltávolítása az elemhez
   nth2.classList.toggle('span_2-clicked');
   // A 3. gyermek elem kiválasztása
   nth3 = document.querySelector('span:nth-child(3)');
   // A 'span_3-clicked' osztály hozzáadása vagy eltávolítása az elemhez
   nth3.classList.toggle('span_3-clicked');
});

// Az 'leb__aside' azonosítójú elem kiválasztása
var outClickAside = document.getElementById('leb__aside');
// Az 'nav__icon' azonosítójú elem kiválasztása
var outClickIcon = document.getElementById('nav__icon');
document.addEventListener('click', function (event) {
   // Az esemény célelemének kiválasztása
   var target = event.target;
   if (!outClickAside.contains(target) && !outClickIcon.contains(target)) {
      // Az 'nav__on' osztály eltávolítása az 'leb__aside' elemről
      outClickAside.classList.remove('nav__on');
      // Az 'nav__icon-on' osztály eltávolítása a 'nav__icon' elemről
      outClickIcon.classList.remove('nav__icon-on');
      // A 1. gyermek elem kiválasztása
      nth1 = document.querySelector('span:nth-child(1)');
      // A 'span_1-clicked' osztály eltávolítása az elemről
      nth1.classList.remove('span_1-clicked');
      // A 2. gyermek elem kiválasztása
      nth2 = document.querySelector('span:nth-child(2)');
      // A 'span_2-clicked' osztály eltávolítása az elemről
      nth2.classList.remove('span_2-clicked');
      // A 3. gyermek elem kiválasztása
      nth3 = document.querySelector('span:nth-child(3)');
      // A 'span_3-clicked' osztály eltávolítása az elemről
      nth3.classList.remove('span_3-clicked');
   }
});