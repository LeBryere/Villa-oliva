/************************************************************************\
                                 Leb Slider
\************************************************************************/
(function () {

   // "The function initializes the slideshow on the given element (item).
   function init(item) {

      // We select the slide elements in the slideshow.
      var items = item.querySelectorAll('li'),

         // We set the initial values.
         current = 0,
         autoUpdate = true,
         timeTrans = 500000;

      // We create the nav element and add nav_arrow class .
      var nav = document.createElement('nav');
      nav.className = 'nav_arrows';

      // We create the next button.
      var prevbtn = document.createElement('div');
      prevbtn.className = 'prev';
      prevbtn.setAttribute('aria-label', 'Prev');
      prevbtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25.109px" height="34.906px" viewBox="0 0 25.109 34.906" enable-background="new 0 0 25.109 34.906" xml:space="preserve"><polyline fill="none" stroke="" stroke-miterlimit="10" points="24.67,34.59 11.653,17.464 24.67,0.338 "></polyline><polyline fill="none" class="popout" stroke="" stroke-miterlimit="10" points="13.688,34.59 0.671,17.464 13.688,0.338 "></polyline></svg>`

      // We create the next button.
      var nextbtn = document.createElement('div');
      nextbtn.className = 'next';
      nextbtn.setAttribute('aria-label', 'Next');
      nextbtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25.109px" height="34.906px" viewBox="0 0 25.109 34.906" enable-background="new 0 0 25.109 34.906" xml:space="preserve"><polyline fill="none" stroke="" stroke-miterlimit="10" points="0.442,34.59 13.459,17.464 0.442,0.338 "></polyline><polyline fill="none" class="popout" stroke="" stroke-miterlimit="10" points="11.425,34.59 24.441,17.464 11.425,0.338 "></polyline></svg>`

      // If there is more than one slide, we add the navigation elements to the item.
      if (items.length > 1) {
         nav.appendChild(prevbtn);
         nav.appendChild(nextbtn);
         item.appendChild(nav);
      }

      // We set the current and previous slides.
      items[current].className = "current";
      if (items.length > 1) items[items.length - 1].className = "prev-slider";

      // The "navigate" function changes the slides.
      var navigate = function (dir) {
         items[current].className = "";

         // If we go right, we increase the value of the "current" variable.
         if (dir === 'right') {
            current = current < items.length - 1 ? current + 1 : 0;
            // If we go left, we decrease the value of the "current" variable.
         } else {
            current = current > 0 ? current - 1 : items.length - 1;
         }

         // We set the current and previous slides.
         var nextCurrent = current < items.length - 1 ? current + 1 : 0;
         var prevCurrent = current > 0 ? current - 1 : items.length - 1;

         items[current].className = "current";
         items[prevCurrent].className = "prev-slider";
         items[nextCurrent].className = "";
      }

      // If the mouse is over the slideshow, we turn off automatic updates.
      item.addEventListener('mouseenter', function () {
         autoUpdate = false;
      });
      // If the mouse leaves the slideshow, we turn automatic updates back on.
      item.addEventListener('mouseleave', function () {
         autoUpdate = true;
      });

      setInterval(function () {
         if (autoUpdate) navigate('right');
      }, timeTrans);

      prevbtn.addEventListener('click', function () {
         navigate('left');
      });

      nextbtn.addEventListener('click', function () {
         navigate('right');
      });

      //keyboard navigation
      document.addEventListener('keydown', function (ev) {
         var keyCode = ev.keyCode || ev.which;
         switch (keyCode) {
            case 37:
               navigate('left');
               break;
            case 39:
               navigate('right');
               break;
         }
      });

      // Navigation with sensor devices.
      item.addEventListener('touchstart', handleTouchStart, false);
      item.addEventListener('touchmove', handleTouchMove, false);
      var xDown = null;
      var yDown = null;

      // Event handler for touch movement.
      function handleTouchStart(evt) {
         xDown = evt.touches[0].clientX;
         yDown = evt.touches[0].clientY;
      };

      // Event handler for touch movement.
      function handleTouchMove(evt) {
         if (!xDown || !yDown) {
            return;
         }

         var xUp = evt.touches[0].clientX;
         var yUp = evt.touches[0].clientY;

         var xDiff = xDown - xUp;
         var yDiff = yDown - yUp;

         // Detect right-left movements.
         if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
               // If we move left, we navigate right.
               navigate('right');
            } else {
               navigate('left');
            }
         }

         // Resetting x and y values when touch is finished."
         xDown = null;
         yDown = null;
      };

   }
   [].slice.call(document.querySelectorAll('.leb__slider')).forEach(function (item) {
      init(item);
   });
   document.getElementsByClassName
})();

/************************************************************************\
                           Leb Slider animation
\************************************************************************/
// Elemek kiválasztása
var elemek = document.querySelectorAll('.leb__slider ul li');
// MutationObserver létrehozása
var observer = new MutationObserver(function (mutations) {
   mutations.forEach(function (mutation) {
      // Ellenőrizzük, hogy a DOM változás attribútumváltozás és a class attribútum változása
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
         var currentElem = mutation.target;
         // Kiválasztjuk az összes '.animate-box' osztályú elemet a jelenlegi elemen belül
         var leb__sliderInners = currentElem.querySelectorAll('.animate-box');
         leb__sliderInners.forEach(function (leb__sliderInner, index) {
            // Eltávolítjuk az animációs hatásokkal kapcsolatos osztályokat a leb__sliderInner elemről
            removeAnimateEffectClasses(leb__sliderInner);
            // Ellenőrizzük, hogy a jelenlegi elem tartalmazza-e a 'current' osztályt
            if (currentElem.classList.contains('current')) {
               var animateEffect = leb__sliderInner.getAttribute('animate-effect');
               if (animateEffect) {
                  var delay = (index + 1) * 0.4;
                  leb__sliderInner.style.animationDelay = delay + 's';

                  // Hozzáadjuk az animációs hatás osztályokat a leb__sliderInner elemhez
                  leb__sliderInner.classList.add(animateEffect);
                  leb__sliderInner.classList.add('animated');
               }
            }
         });

         // Kiválasztjuk az összes '.leb__image' osztályú elemet a jelenlegi elemen belül
         var lebImages = currentElem.querySelectorAll('.leb__image')
         lebImages.forEach(function (lebImage) {
            // Eltávolítjuk a zoom hatásokkal kapcsolatos osztályokat a lebImage elemről
            removeZoomEffectClasses(lebImage);
            // Ellenőrizzük, hogy a jelenlegi elem tartalmazza-e a 'current' osztályt
            if (currentElem.classList.contains('current')) {
               var zoomEffect = lebImage.getAttribute('zoom-image')
               if (zoomEffect) {
                  // Hozzáadjuk a zoom hatás osztályokat a lebImage elemhez
                  lebImage.classList.add(zoomEffect)
                  lebImage.classList.add('zoomtime')
               }
            }
         })
      }
   });
});

// Elemek figyelése a DOM-ban bekövetkező változásokra
elemek.forEach(function (elem) {
   // Observer hozzáadása az elemhez, figyelve az attribútumváltozásokat
   observer.observe(elem, { attributes: true });
});

// Animációs hatás osztályok eltávolítása a leb__sliderInner elemekről
function removeAnimateEffectClasses(leb__sliderInner) {
   var animateEffect = leb__sliderInner.getAttribute('animate-effect');
   if (animateEffect) {
      leb__sliderInner.classList.remove(animateEffect);
      leb__sliderInner.classList.remove('animated');
   }
}

// Zoom hatás osztályok eltávolítása a lebImage elemekről
function removeZoomEffectClasses(lebImage) {
   var zoomEffect = lebImage.getAttribute('zoom-image');
   if (zoomEffect) {
      lebImage.classList.remove(zoomEffect);
      lebImage.classList.remove('zoomtime');
   }
}
