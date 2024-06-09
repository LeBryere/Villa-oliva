/************************************************************************\
                                 Leb animation
\************************************************************************/
document.addEventListener('DOMContentLoaded', function () {
   "use strict";
   var wind = window;

   var contentWayPoint = function () {
      // Kiválasztja az összes '.animate-img' osztályú elemet
      var animateBoxes = document.querySelectorAll('.animate-img');

      // Az Intersection Observer callback függvénye
      var waypointCallback = function (entries) {
         entries.forEach(function (entry, index) {
            // Ellenőrzi, hogy az elem látható és még nem lett animálva
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
               // Hozzáadja az 'animated' és 'item-animate' osztályokat az elemhez
               entry.target.classList.add('animated', 'item-animate');
               var currentItem = entry.target;
               var animationDelay = 100;
               var animationDuration = 1000;
               // Késleltetés kiszámítása az elem indexe alapján
               var delay = (index + 1) * animationDelay;

               setTimeout(function () {
                  // Kiválasztja az összes animált elemet
                  var itemAnimateBoxes = document.querySelectorAll('body .animate-img.animated.item-animate');
                  itemAnimateBoxes.forEach(function (el, k) {
                     if (el === currentItem) {
                        // Az animációs hatás attribútumának értékét kinyeri
                        var effect = el.getAttribute('data-animate-effect');
                        // Beállítja az animáció késleltetését
                        el.style.animationDelay = delay + 'ms';
                        // Beállítja az animáció időtartamát
                        el.style.animationDuration = animationDuration + 'ms';

                        if (effect) {
                           // Hozzáadja az animációs hatást az elemhez
                           el.classList.add(effect);
                        }

                        // Eltávolítja az 'item-animate' osztályt az elemről
                        el.classList.remove('item-animate');
                     }
                  });
               }, 100);
            }
         });
      };

      // Intersection Observer inicializálása
      var observer = new IntersectionObserver(waypointCallback, { rootMargin: '20px' });
      animateBoxes.forEach(function (box) {
         // Az Observer figyeli az összes elemet
         observer.observe(box);
      });
   };

   // Az animációk beállítása
   contentWayPoint();

   var lastScrollTop = 0;

   window.addEventListener('scroll', function () {
      // Az ablak görgetési helyzetének meghatározása
      var st = window.pageYOffset || document.documentElement.scrollTop;

      // Ellenőrzi, hogy a felhasználó lefelé görget-e
      if (st > lastScrollTop) {
         // Kiválasztja az összes '.animate-img' osztályú elemet
         var animateBoxes = document.getElementsByClassName('animate-img');

         for (var i = 0; i < animateBoxes.length; i++) {
            var animateBox = animateBoxes[i];
            // Az elem pozíciójának meghatározása
            var rect = animateBox.getBoundingClientRect();
            // Az ablak magasságának meghatározása
            var windowHeight = window.innerHeight || document.documentElement.clientHeight;

            // Ellenőrzi, hogy az elem kívülre került-e az ablakon
            if (rect.top > windowHeight + 20) {
               // Eltávolítja az animációs osztályokat az elemről
               animateBox.classList.remove('animated', 'fadeIn', 'fadeInUp', 'fadeInLeft', 'fadeInRight');
            }
         }
      }

      // Az előző görgetési helyzet frissítése
      lastScrollTop = st;
   });
});