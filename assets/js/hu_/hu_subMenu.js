/************************************************************************\
                                 Sub menu
\************************************************************************/
// Az összes '.leb__sub' osztályú elem kiválasztása
var clickMenu = document.querySelectorAll('.leb__sub');

clickMenu.forEach(function (subMenu) {
   subMenu.addEventListener('click', function () {
      // Az 'span' elem kiválasztása a 'subMenu' elemen belül
      var subSpan = subMenu.querySelector('span');
      // A következő testvér elem kiválasztása a kattintott elem után
      var clickedUl = event.target.nextElementSibling;
      // Az 'show-submenu' osztály hozzáadása vagy eltávolítása a 'clickedUl' elemhez
      clickedUl.classList.toggle('show-submenu');
      if (clickedUl.classList.contains('show-submenu')) {
         // Az 'arrow-rotate' osztály hozzáadása az 'subSpan' elemhez
         subSpan.classList.add('arrow-rotate');
      } else {
         // Az 'arrow-rotate' osztály eltávolítása az 'subSpan' elemről
         subSpan.classList.remove('arrow-rotate');
      }
   });
});