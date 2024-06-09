
/************************************************************************\
                           TO TOP BUTTON
\************************************************************************/
const toTopPath = document.querySelector('.totop path'),
   pathLength = toTopPath.getTotalLength();
toTopPath.style.transition = 'none';
toTopPath.style.strokeDasharray = pathLength;
toTopPath.style.strokeDashoffset = pathLength;
toTopPath.style.transition = 'stroke-dashoffset 10ms linear';

function updateTotop() {
   const scroll = window.scrollY,
      height = document.documentElement.scrollHeight - window.innerHeight,
      toTop = pathLength - (scroll * pathLength / height);
   toTopPath.style.strokeDashoffset = toTop;
}

updateTotop();
window.addEventListener('scroll', updateTotop);

const offset = 150;

window.addEventListener('scroll', () => {
   const totop = document.querySelector('.totop')
   totop.classList.toggle('active-totop', window.scrollY > offset)
});

/************************************************************************\
                           SVG STROKE LENGTH
\************************************************************************/
// Getting the length of the SVG line. Use svg path:nth-child() in CSS.
let miaText = document.getElementById("miatext");
let svgW = miaText.clientWidth;
let svgI = svgW / 417; // 190 = viewBox="..X..X.190..X"
miaText.style.width = svgW

for (var i = 1; i <= 10; i++) {
   let letter = document.getElementById("letter-" + i);
   let letterLength = letter.getTotalLength().toFixed(0);
   letter.style.strokeDasharray = (svgI * letterLength)
   letter.style.strokeDashoffset = (svgI * letterLength)

   console.log("Letter " + i + ": " + svgI * letterLength); // not necessary
}

/************************************************************************\
                           ADD ACTIVE TO MENU
\************************************************************************/
const sections = document.querySelectorAll("section")
onscroll = function () {
   let scrollPosition = document.documentElement.scrollTop;
   sections.forEach((i) => {
      if (
         scrollPosition >= i.offsetTop - i.offsetHeight * 0.25 &&
         scrollPosition < i.offsetTop + i.offsetHeight - i.offsetHeight * 0.25
      ) {
         let currentId = i.attributes.id.value
         removeAllActiveClasses()
         addActiveClass(currentId)
      }
   });
};

const removeAllActiveClasses = () => {
   document.querySelectorAll("nav a").forEach((el) => el.classList.remove("active"))
};

const addActiveClass = (id) => {
   const selector = `nav a[href="#${id}"]`,
      link = document.querySelector(selector);
   link?.classList.add("active")
};

/************************************************************************\
                             HAMBURGER MENU
\************************************************************************/
const outClickAside = document.getElementById('leb__aside'),
   outClickIcon = document.getElementById('nav__icon'),
   hamIcon = document.getElementById('nav__icon'),
   navMenuItems = document.querySelectorAll('.leb__main-menu li [href^="#leb__"]'),
   nth1 = document.querySelector('span:nth-child(1)'),
   nth2 = document.querySelector('span:nth-child(2)'),
   nth3 = document.querySelector('span:nth-child(3)');
let isAsideActive = false;

function toggleNavigation() {
   isAsideActive = !isAsideActive;
   outClickAside.classList.toggle('nav__on', isAsideActive);
   nth1.classList.toggle('span_1-clicked', isAsideActive);
   nth2.classList.toggle('span_2-clicked', isAsideActive);
   nth3.classList.toggle('span_3-clicked', isAsideActive);
}

hamIcon.addEventListener('click', toggleNavigation);

document.addEventListener('click', (event) => {
   (isAsideActive && !outClickAside.contains(event.target) && !outClickIcon.contains(event.target)) ? toggleNavigation() : null
});

navMenuItems.forEach((menuItem) => {
   menuItem.addEventListener('click', toggleNavigation);
});

/************************************************************************\
                                 Sub menu

let clickMenu = document.querySelectorAll('.leb__sub');

clickMenu.forEach((subMenu) => {
   subMenu.addEventListener('click', (event) => {
      let subSpan = subMenu.querySelector('span'),
         clickedUl = event.target.nextElementSibling;

      clickedUl.classList.toggle('show-submenu')
      subSpan.classList.toggle('arrow-rotate', clickedUl.classList.contains('show-submenu'))
   })
});
\************************************************************************/

/************************************************************************\
                              set TUC time
\************************************************************************/
let utc = 2;
let currentDate = new Date();
currentDate.setTime(currentDate.getTime() + currentDate.getTimezoneOffset() * 60 * 1000 + (/* UTC+2 */ utc) * 60 * 60 * 1000);
let currentDay = currentDate.getDay();
let currentHour = currentDate.getHours();
let checkIn = document.getElementById("check-in");
let checkOut = document.getElementById("check-out");

function openClose() {
   checkIn.style.color = (currentHour >= 14 && currentHour <= 17) ? "green" : "red";
   checkOut.style.color = (currentHour >= 7 && currentHour <= 9) ? "green" : "red";
}

setInterval(openClose(), 5000)

/************************************************************************\
                                 Leb animation
\************************************************************************/
document.addEventListener('DOMContentLoaded', function () {
   "use strict";
   let wind = window;

   let contentWayPoint = function () {
      let animateBoxes = document.querySelectorAll('.animate-img');

      let waypointCallback = function (entries) {
         entries.forEach(function (entry, index) {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
               entry.target.classList.add('animated', 'item-animate');
               let currentItem = entry.target;
               let animationDelay = 100;
               let animationDuration = 1000;
               let delay = (index + 1) * animationDelay;

               setTimeout(function () {
                  let itemAnimateBoxes = document.querySelectorAll('body .animate-img.animated.item-animate');
                  itemAnimateBoxes.forEach(function (el, k) {
                     if (el === currentItem) {
                        let effect = el.getAttribute('data-animate-effect');
                        el.style.animationDelay = delay + 'ms';
                        el.style.animationDuration = animationDuration + 'ms';

                        if (effect) {
                           el.classList.add(effect);
                        }

                        el.classList.remove('item-animate');
                     }
                  });
               }, 100);
            }
         });
      };

      let observer = new IntersectionObserver(waypointCallback, { rootMargin: '20px' });
      animateBoxes.forEach(function (box) {
         observer.observe(box);
      });
   };

   contentWayPoint();

   let lastScrollTop = 0;

   window.addEventListener('scroll', function () {
      let st = window.pageYOffset || document.documentElement.scrollTop;

      if (st > lastScrollTop) {
         let animateBoxes = document.getElementsByClassName('animate-img');

         for (let i = 0; i < animateBoxes.length; i++) {
            let animateBox = animateBoxes[i];
            let rect = animateBox.getBoundingClientRect();
            let windowHeight = window.innerHeight || document.documentElement.clientHeight;

            if (rect.top > windowHeight + 20) {
               animateBox.classList.remove('animated', 'fadeIn', 'fadeInUp', 'fadeInLeft', 'fadeInRight');
            }
         }
      }

      lastScrollTop = st;
   });
});

/************************************************************************\
                                 Leb Slider
\************************************************************************/
(function () {

   function init(item) {

      let items = item.querySelectorAll('li'),

         current = 0,
         autoUpdate = true,
         timeTrans = 700000;

      let nav = document.createElement('nav');
      nav.className = 'nav_arrows';

      let prevbtn = document.createElement('div');
      prevbtn.className = 'prev';
      prevbtn.setAttribute('aria-label', 'Prev');
      prevbtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25.109px" height="34.906px" viewBox="0 0 25.109 34.906" enable-background="new 0 0 25.109 34.906" xml:space="preserve"><polyline fill="none" stroke="" stroke-miterlimit="10" points="24.67,34.59 11.653,17.464 24.67,0.338 "></polyline><polyline fill="none" class="popout" stroke="" stroke-miterlimit="10" points="13.688,34.59 0.671,17.464 13.688,0.338 "></polyline></svg>`

      let nextbtn = document.createElement('div');
      nextbtn.className = 'next';
      nextbtn.setAttribute('aria-label', 'Next');
      nextbtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25.109px" height="34.906px" viewBox="0 0 25.109 34.906" enable-background="new 0 0 25.109 34.906" xml:space="preserve"><polyline fill="none" stroke="" stroke-miterlimit="10" points="0.442,34.59 13.459,17.464 0.442,0.338 "></polyline><polyline fill="none" class="popout" stroke="" stroke-miterlimit="10" points="11.425,34.59 24.441,17.464 11.425,0.338 "></polyline></svg>`

      if (items.length > 1) {
         nav.appendChild(prevbtn);
         nav.appendChild(nextbtn);
         item.appendChild(nav);
      }

      items[current].className = "current";
      if (items.length > 1) items[items.length - 1].className = "prev-slider";

      let navigate = function (dir) {
         items[current].className = "";

         if (dir === 'right') {
            current = current < items.length - 1 ? current + 1 : 0;
         } else {
            current = current > 0 ? current - 1 : items.length - 1;
         }

         let nextCurrent = current < items.length - 1 ? current + 1 : 0;
         let prevCurrent = current > 0 ? current - 1 : items.length - 1;

         items[current].className = "current";
         items[prevCurrent].className = "prev-slider";
         items[nextCurrent].className = "";
      }

      item.addEventListener('mouseenter', function () {
         autoUpdate = false;
      });
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
         let keyCode = ev.keyCode || ev.which;
         switch (keyCode) {
            case 37:
               navigate('left');
               break;
            case 39:
               navigate('right');
               break;
         }
      });

      item.addEventListener('touchstart', handleTouchStart, false);
      item.addEventListener('touchmove', handleTouchMove, false);
      let xDown = null;
      let yDown = null;

      function handleTouchStart(evt) {
         xDown = evt.touches[0].clientX;
         yDown = evt.touches[0].clientY;
      };

      function handleTouchMove(evt) {
         if (!xDown || !yDown) {
            return;
         }

         let xUp = evt.touches[0].clientX;
         let yUp = evt.touches[0].clientY;

         let xDiff = xDown - xUp;
         let yDiff = yDown - yUp;

         if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
               navigate('right');
            } else {
               navigate('left');
            }
         }

         xDown = null;
         yDown = null;
      };

   }
   [].slice.call(document.querySelectorAll('.leb__slider')).forEach(function (item) {
      init(item);
   });
})();

/************************************************************************\
                           Leb Slider animation
\************************************************************************/
let elemek = document.querySelectorAll('.leb__slider ul li');
let observer = new MutationObserver(function (mutations) {
   mutations.forEach(function (mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
         let currentElem = mutation.target;
         let leb__sliderInners = currentElem.querySelectorAll('.animate-box');
         leb__sliderInners.forEach(function (leb__sliderInner, index) {
            removeAnimateEffectClasses(leb__sliderInner);
            if (currentElem.classList.contains('current')) {
               let animateEffect = leb__sliderInner.getAttribute('animate-effect');
               if (animateEffect) {
                  let delay = (index + 1) * 0.4;
                  leb__sliderInner.style.animationDelay = delay + 's';

                  leb__sliderInner.classList.add(animateEffect);
                  leb__sliderInner.classList.add('animated');
               }
            }
         });

         let lebImages = currentElem.querySelectorAll('.leb__image')
         lebImages.forEach(function (lebImage) {
            removeZoomEffectClasses(lebImage);
            if (currentElem.classList.contains('current')) {
               let zoomEffect = lebImage.getAttribute('zoom-image')
               if (zoomEffect) {
                  lebImage.classList.add(zoomEffect)
                  lebImage.classList.add('zoomtime')
               }
            }
         })
      }
   });
});

elemek.forEach(function (elem) {
   observer.observe(elem, { attributes: true });
});

function removeAnimateEffectClasses(leb__sliderInner) {
   let animateEffect = leb__sliderInner.getAttribute('animate-effect');
   if (animateEffect) {
      leb__sliderInner.classList.remove(animateEffect);
      leb__sliderInner.classList.remove('animated');
   }
}

function removeZoomEffectClasses(lebImage) {
   let zoomEffect = lebImage.getAttribute('zoom-image');
   if (zoomEffect) {
      lebImage.classList.remove(zoomEffect);
      lebImage.classList.remove('zoomtime');
   }
}

/************************************************************************\
                                 Rooms slider
\************************************************************************/
(function () {

   function init(item) {
      let items = item.querySelectorAll('li'),
         current = 0,
         autoUpdate = true,
         timeTrans = 600000;

      let sliderNav = document.createElement('slider-nav');
      sliderNav.className = 'nav-arrows';

      let prevbtn = document.createElement('button');
      prevbtn.className = 'prev flaticon-back';
      prevbtn.setAttribute('aria-label', 'Prev');

      let nextbtn = document.createElement('button');
      nextbtn.className = 'next flaticon-next';
      nextbtn.setAttribute('aria-label', 'Next');

      let counter = document.createElement('div');
      counter.className = 'counter';
      counter.innerHTML = "<span>1</span><span>" + items.length + "</span>";

      if (items.length > 1) {
         sliderNav.appendChild(prevbtn);
         sliderNav.appendChild(counter);
         sliderNav.appendChild(nextbtn);
         item.appendChild(sliderNav);
      }

      items[current].className = "current";
      if (items.length > 1) items[items.length - 1].className = "prev-slider";

      let navigate = function (dir) {
         items[current].className = "";

         if (dir === 'right') {
            current = current < items.length - 1 ? current + 1 : 0;
         } else {
            current = current > 0 ? current - 1 : items.length - 1;
         }

         let nextCurrent = current < items.length - 1 ? current + 1 : 0,
            prevCurrent = current > 0 ? current - 1 : items.length - 1;

         items[current].className = "current";
         items[prevCurrent].className = "prev-slider";
         items[nextCurrent].className = "";

         counter.firstChild.textContent = current + 1;
      }

      item.addEventListener('mouseenter', function () {
         autoUpdate = false;
      });

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

      document.addEventListener('keydown', function (ev) {
         let keyCode = ev.keyCode || ev.which;
         switch (keyCode) {
            case 37:
               navigate('left');
               break;
            case 39:
               navigate('right');
               break;
         }
      });

      item.addEventListener('touchstart', handleTouchStart, false);
      item.addEventListener('touchmove', handleTouchMove, false);
      let xDown = null;
      let yDown = null;
      function handleTouchStart(evt) {
         xDown = evt.touches[0].clientX;
         yDown = evt.touches[0].clientY;
      };
      function handleTouchMove(evt) {
         if (!xDown || !yDown) {
            return;
         }

         let xUp = evt.touches[0].clientX;
         let yUp = evt.touches[0].clientY;

         let xDiff = xDown - xUp;
         let yDiff = yDown - yUp;

         if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
               /* left swipe */
               navigate('right');
            } else {
               navigate('left');
            }
         }
         /* reset values */
         xDown = null;
         yDown = null;
      };
   }

   [].slice.call(document.querySelectorAll('.leb__room-slider')).forEach(function (item) {
      init(item);
   });
})();

/************************************************************************\
                              POPUP VIDEO
\************************************************************************/
const openPopupButton = document.getElementById("openPopupButton"),
   closeButton = document.getElementById("closeButton"),
   vid = document.getElementById("leb__bg_vid"),
   videoPopup = document.getElementById("videoPopup"),
   pauseButton = document.querySelector("#lebVid button"),
   lebVid = document.getElementById("lebVid"),
   fullscreenButton = document.getElementById("fullscreenButton"),
   muteButton = document.getElementById("muteButton");

openPopupButton.addEventListener("click", () => {
   videoPopup.style.display = "flex";
   vid.paused ? vid.play() : null;
});

closeButton.addEventListener("click", () => {
   videoPopup.style.display = "none";
   vid.pause()
});

pauseButton.addEventListener("click", () => {
   vid.paused ? (vid.play(), pauseButton.innerHTML = "<img src='assets/images/icons/pause.png' alt='Pause' class='filter-color' />", pauseButton.style.color = "var(--design-500)") : (vid.pause(), pauseButton.innerHTML = "<img src='assets/images/icons/play.png' alt='Play' class='filter-color'/>", pauseButton.style.color = "#fff")
});

muteButton.addEventListener("click", () => {
   vid.muted = !vid.muted;

   if (vid.muted) {
      muteButton.innerHTML = "<img src='assets/images/icons/sound.png' alt='Sound' class='filter-color' />";
   } else {
      muteButton.innerHTML = "<img src='assets/images/icons/mute.png' alt='Mute' class='filter-color' />";
   }
});

document.addEventListener("DOMContentLoaded", () => {
   (window.matchMedia("(orientation: landscape)").matches) ? lebVid.style.top = ".5rem" : lebVid.style.top = "inherit";

   fullscreenButton.addEventListener("click", () => {
      vid.requestFullscreen ? vid.requestFullscreen() :
         vid.mozRequestFullScreen ? vid.mozRequestFullScreen() :
            vid.webkitRequestFullscreen ? vid.webkitRequestFullscreen() :
               vid.msRequestFullscreen ? vid.msRequestFullscreen() : null
   });

   window.addEventListener("orientationchange", () => {
      window.matchMedia("(orientation: landscape)").matches ? lebVid.style.top = "auto" : lebVid.style.top = ".5rem";
   });
});

/************************************************************************\
                           CAROUSEL
\************************************************************************/
let leb__carousel, next, prev, items;
leb__carousel = document.querySelector('.leb__carousel')
items = document.querySelectorAll('.leb__carousel-item')

next = (el) => {
   if (el.nextElementSibling !== null) {
      return el.nextElementSibling;
   } else {
      return items[0];
   }
};

prev = (el) => {
   if (el.previousElementSibling !== null) {
      return el.previousElementSibling;
   } else {
      return items[items.length - 1];
   }
};

document.querySelectorAll('.toggle').forEach((item) => {
   item.addEventListener('click', (e) => {
      let el, new_item;
      el = document.querySelector('.set-forward');
      el.classList.remove('set-forward');

      new_item = (item.getAttribute('data-toggle') === 'next') ? next(el) : prev(el);

      leb__carousel.classList.toggle('moves-back', item.getAttribute('data-toggle') !== 'next');

      new_item.classList.add('set-forward');
      new_item.style.order = 1;

      for (let i = 2; i <= items.length; i++) {
         new_item = next(new_item);
         new_item.style.order = i;
      }

      leb__carousel.classList.remove('set-move');
      setTimeout(() => {
         leb__carousel.classList.add('set-move');
      }, 10);
   });

   if (item.getAttribute('data-toggle') === 'next') {
      item.setAttribute('aria-label', 'Next');
   } else {
      item.setAttribute('aria-label', 'Previous');
   }
});

document.addEventListener('keydown', function (ev) {
   var keyCode = ev.keyCode || ev.which;
   switch (keyCode) {
      case 37:
         nextSlide();
         break;
      case 39:
         prevSlide();
         break;
   }
});

function nextSlide() {
   let currentSlide = document.querySelector('.set-forward');
   let newSlide = next(currentSlide);

   leb__carousel.classList.remove('moves-back');
   leb__carousel.classList.remove('set-move');

   currentSlide.classList.remove('set-forward');

   newSlide.classList.add('set-forward');
   newSlide.style.order = 1;

   for (let i = 2; i <= items.length; i++) {
      newSlide = next(newSlide);
      newSlide.style.order = i;
   }

   setTimeout(() => {
      leb__carousel.classList.add('set-move');
   }, 10);
}

function prevSlide() {
   let currentSlide = document.querySelector('.set-forward');
   let newSlide = prev(currentSlide);

   leb__carousel.classList.add('moves-back');
   leb__carousel.classList.remove('set-move');

   currentSlide.classList.remove('set-forward');
   newSlide.classList.add('set-forward');
   newSlide.style.order = 1;

   for (let i = 2; i <= items.length; i++) {
      newSlide = next(newSlide);
      newSlide.style.order = i;
   }

   setTimeout(() => {
      leb__carousel.classList.add('set-move');
   }, 10);
}

/************************************************************************\
      SmoothScroll v16.1.4 | (c) 2020 Chris Ferdinandi | MIT License
               http://github.com/cferdinandi/smooth-scroll
\************************************************************************/

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
      typeof define === 'function' && define.amd ? define(factory) :
         (global = global || self, global.SmoothScroll = factory());
}(this, (function () {
   'use strict';

   // Default settings
   var defaults = {

      // Selectors
      ignore: '[data-scroll-ignore]',
      header: null,
      topOnEmptyHash: true,

      // Speed & Duration
      speed: 500,
      speedAsDuration: false,
      durationMax: null,
      durationMin: null,
      clip: true,
      offset: 0,

      // Easing
      easing: 'easeInOutCubic',
      customEasing: null,

      // History
      updateURL: true,
      popstate: true,

      // Custom Events
      emitEvents: true
   };

   // Utility Methods
   /**
    * Check if browser supports required methods
    * @return {Boolean} Returns true if all required methods are supported
    */
   var supports = function () {
      return (
         'querySelector' in document &&
         'addEventListener' in window &&
         'requestAnimationFrame' in window &&
         'closest' in window.Element.prototype
      );
   };

   /**
    * Merge two or more objects together.
    * @param   {Object}   objects  The objects to merge together
    * @returns {Object}            Merged values of defaults and options
    */
   var extend = function () {
      var merged = {};
      Array.prototype.forEach.call(arguments, function (obj) {
         for (var key in obj) {
            if (!obj.hasOwnProperty(key)) return;
            merged[key] = obj[key];
         }
      });
      return merged;
   };

   /**
    * Check to see if user prefers reduced motion
    * @param  {Object} settings Script settings
    */
   var reduceMotion = function () {
      if ('matchMedia' in window && window.matchMedia('(prefers-reduced-motion)').matches) {
         return true;
      }
      return false;
   };

   /**
    * Get the height of an element.
    * @param  {Node} elem The element to get the height of
    * @return {Number}    The element's height in pixels
    */
   var getHeight = function (elem) {
      return parseInt(window.getComputedStyle(elem).height, 10);
   };

   /**
    * Escape special characters for use with querySelector
    * @author Mathias Bynens
    * @link https://github.com/mathiasbynens/CSS.escape
    * @param {String} id The anchor ID to escape
    */
   var escapeCharacters = function (id) {

      // Remove leading hash
      if (id.charAt(0) === '#') {
         id = id.substr(1);
      }

      var string = String(id);
      var length = string.length;
      var index = -1;
      var codeUnit;
      var result = '';
      var firstCodeUnit = string.charCodeAt(0);
      while (++index < length) {
         codeUnit = string.charCodeAt(index);
         // Note: there’s no need to special-case astral symbols, surrogate
         // pairs, or lone surrogates.

         // If the character is NULL (U+0000), then throw an
         // `InvalidCharacterError` exception and terminate these steps.
         if (codeUnit === 0x0000) {
            throw new InvalidCharacterError(
               'Invalid character: the input contains U+0000.'
            );
         }

         if (
            // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
            // U+007F, […]
            (codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
            // If the character is the first character and is in the range [0-9]
            // (U+0030 to U+0039), […]
            (index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
            // If the character is the second character and is in the range [0-9]
            // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
            (
               index === 1 &&
               codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
               firstCodeUnit === 0x002D
            )
         ) {
            // http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
            result += '\\' + codeUnit.toString(16) + ' ';
            continue;
         }

         // If the character is not handled by one of the above rules and is
         // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
         // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
         // U+005A), or [a-z] (U+0061 to U+007A), […]
         if (
            codeUnit >= 0x0080 ||
            codeUnit === 0x002D ||
            codeUnit === 0x005F ||
            codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
            codeUnit >= 0x0041 && codeUnit <= 0x005A ||
            codeUnit >= 0x0061 && codeUnit <= 0x007A
         ) {
            // the character itself
            result += string.charAt(index);
            continue;
         }

         // Otherwise, the escaped character.
         // http://dev.w3.org/csswg/cssom/#escape-a-character
         result += '\\' + string.charAt(index);
      }

      // Return sanitized hash
      return '#' + result;
   };

   /**
    * Calculate the easing pattern
    * @link https://gist.github.com/gre/1650294
    * @param   {Object} settings Easing pattern
    * @param   {Number} time     Time animation should take to complete
    * @returns {Number}
    */
   var easingPattern = function (settings, time) {
      var pattern;

      // Default Easing Patterns
      if (settings.easing === 'easeInQuad') pattern = time * time; // accelerating from zero velocity
      if (settings.easing === 'easeOutQuad') pattern = time * (2 - time); // decelerating to zero velocity
      if (settings.easing === 'easeInOutQuad') pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
      if (settings.easing === 'easeInCubic') pattern = time * time * time; // accelerating from zero velocity
      if (settings.easing === 'easeOutCubic') pattern = (--time) * time * time + 1; // decelerating to zero velocity
      if (settings.easing === 'easeInOutCubic') pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
      if (settings.easing === 'easeInQuart') pattern = time * time * time * time; // accelerating from zero velocity
      if (settings.easing === 'easeOutQuart') pattern = 1 - (--time) * time * time * time; // decelerating to zero velocity
      if (settings.easing === 'easeInOutQuart') pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
      if (settings.easing === 'easeInQuint') pattern = time * time * time * time * time; // accelerating from zero velocity
      if (settings.easing === 'easeOutQuint') pattern = 1 + (--time) * time * time * time * time; // decelerating to zero velocity
      if (settings.easing === 'easeInOutQuint') pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration

      // Custom Easing Patterns
      if (!!settings.customEasing) pattern = settings.customEasing(time);

      return pattern || time; // no easing, no acceleration
   };

   /**
    * Determine the document's height
    * @returns {Number}
    */
   var getDocumentHeight = function () {
      return Math.max(
         document.body.scrollHeight, document.documentElement.scrollHeight,
         document.body.offsetHeight, document.documentElement.offsetHeight,
         document.body.clientHeight, document.documentElement.clientHeight
      );
   };

   /**
    * Calculate how far to scroll
    * Clip support added by robjtede - https://github.com/cferdinandi/smooth-scroll/issues/405
    * @param {Element} anchor       The anchor element to scroll to
    * @param {Number}  headerHeight Height of a fixed header, if any
    * @param {Number}  offset       Number of pixels by which to offset scroll
    * @param {Boolean} clip         If true, adjust scroll distance to prevent abrupt stops near the bottom of the page
    * @returns {Number}
    */
   var getEndLocation = function (anchor, headerHeight, offset, clip) {
      var location = 0;
      if (anchor.offsetParent) {
         do {
            location += anchor.offsetTop;
            anchor = anchor.offsetParent;
         } while (anchor);
      }
      location = Math.max(location - headerHeight - offset, 0);
      if (clip) {
         location = Math.min(location, getDocumentHeight() - window.innerHeight);
      }
      return location;
   };

   /**
    * Get the height of the fixed header
    * @param  {Node}   header The header
    * @return {Number}        The height of the header
    */
   var getHeaderHeight = function (header) {
      return !header ? 0 : (getHeight(header) + header.offsetTop);
   };

   /**
    * Calculate the speed to use for the animation
    * @param  {Number} distance The distance to travel
    * @param  {Object} settings The plugin settings
    * @return {Number}          How fast to animate
    */
   var getSpeed = function (distance, settings) {
      var speed = settings.speedAsDuration ? settings.speed : Math.abs(distance / 1000 * settings.speed);
      if (settings.durationMax && speed > settings.durationMax) return settings.durationMax;
      if (settings.durationMin && speed < settings.durationMin) return settings.durationMin;
      return parseInt(speed, 10);
   };

   var setHistory = function (options) {

      // Make sure this should run
      if (!history.replaceState || !options.updateURL || history.state) return;

      // Get the hash to use
      var hash = window.location.hash;
      hash = hash ? hash : '';

      // Set a default history
      history.replaceState(
         {
            smoothScroll: JSON.stringify(options),
            anchor: hash ? hash : window.pageYOffset
         },
         document.title,
         hash ? hash : window.location.href
      );
   };

   /**
    * Update the URL
    * @param  {Node}    anchor  The anchor that was scrolled to
    * @param  {Boolean} isNum   If true, anchor is a number
    * @param  {Object}  options Settings for Smooth Scroll
    */
   var updateURL = function (anchor, isNum, options) {

      // Bail if the anchor is a number
      if (isNum) return;

      // Verify that pushState is supported and the updateURL option is enabled
      if (!history.pushState || !options.updateURL) return;

      // Update URL
      history.pushState(
         {
            smoothScroll: JSON.stringify(options),
            anchor: anchor.id
         },
         document.title,
         anchor === document.documentElement ? '#top' : '#' + anchor.id
      );
   };

   /**
    * Bring the anchored element into focus
    * @param {Node}     anchor      The anchor element
    * @param {Number}   endLocation The end location to scroll to
    * @param {Boolean}  isNum       If true, scroll is to a position rather than an element
    */
   var adjustFocus = function (anchor, endLocation, isNum) {

      // Is scrolling to top of page, blur
      if (anchor === 0) {
         document.body.focus();
      }

      // Don't run if scrolling to a number on the page
      if (isNum) return;

      // Otherwise, bring anchor element into focus
      anchor.focus();
      if (document.activeElement !== anchor) {
         anchor.setAttribute('tabindex', '-1');
         anchor.focus();
         anchor.style.outline = 'none';
      }
      window.scrollTo(0, endLocation);
   };

   /**
    * Emit a custom event
    * @param  {String} type    The event type
    * @param  {Object} options The settings object
    * @param  {Node}   anchor  The anchor element
    * @param  {Node}   toggle  The toggle element
    */
   var emitEvent = function (type, options, anchor, toggle) {
      if (!options.emitEvents || typeof window.CustomEvent !== 'function') return;
      var event = new CustomEvent(type, {
         bubbles: true,
         detail: {
            anchor: anchor,
            toggle: toggle
         }
      });
      document.dispatchEvent(event);
   };

   // SmoothScroll Constructor

   var SmoothScroll = function (selector, options) {

      // Variables
      var smoothScroll = {}; // Object for public APIs
      var settings, toggle, fixedHeader, animationInterval;

      // Methods
      /**
       * Cancel a scroll-in-progress
       */
      smoothScroll.cancelScroll = function (noEvent) {
         cancelAnimationFrame(animationInterval);
         animationInterval = null;
         if (noEvent) return;
         emitEvent('scrollCancel', settings);
      };

      /**
       * Start/stop the scrolling animation
       * @param {Node|Number} anchor  The element or position to scroll to
       * @param {Element}     toggle  The element that toggled the scroll event
       * @param {Object}      options
       */
      smoothScroll.animateScroll = function (anchor, toggle, options) {

         // Cancel any in progress scrolls
         smoothScroll.cancelScroll();

         // Local settings
         var _settings = extend(settings || defaults, options || {}); // Merge user options with defaults

         // Selectors and variables
         var isNum = Object.prototype.toString.call(anchor) === '[object Number]' ? true : false;
         var anchorElem = isNum || !anchor.tagName ? null : anchor;
         if (!isNum && !anchorElem) return;
         var startLocation = window.pageYOffset; // Current location on the page
         if (_settings.header && !fixedHeader) {
            // Get the fixed header if not already set
            fixedHeader = document.querySelector(_settings.header);
         }
         var headerHeight = getHeaderHeight(fixedHeader);
         var endLocation = isNum ? anchor : getEndLocation(anchorElem, headerHeight, parseInt((typeof _settings.offset === 'function' ? _settings.offset(anchor, toggle) : _settings.offset), 10), _settings.clip); // Location to scroll to
         var distance = endLocation - startLocation; // distance to travel
         var documentHeight = getDocumentHeight();
         var timeLapsed = 0;
         var speed = getSpeed(distance, _settings);
         var start, percentage, position;

         /**
          * Stop the scroll animation when it reaches its target (or the bottom/top of page)
          * @param {Number} position Current position on the page
          * @param {Number} endLocation Scroll to location
          * @param {Number} animationInterval How much to scroll on this loop
          */
         var stopAnimateScroll = function (position, endLocation) {

            // Get the current location
            var currentLocation = window.pageYOffset;

            // Check if the end location has been reached yet (or we've hit the end of the document)
            if (position == endLocation || currentLocation == endLocation || ((startLocation < endLocation && window.innerHeight + currentLocation) >= documentHeight)) {

               // Clear the animation timer
               smoothScroll.cancelScroll(true);

               // Bring the anchored element into focus
               adjustFocus(anchor, endLocation, isNum);

               // Emit a custom event
               emitEvent('scrollStop', _settings, anchor, toggle);

               // Reset start
               start = null;
               animationInterval = null;

               return true;
            }
         };

         /**
          * Loop scrolling animation
          */
         var loopAnimateScroll = function (timestamp) {
            if (!start) { start = timestamp; }
            timeLapsed += timestamp - start;
            percentage = speed === 0 ? 0 : (timeLapsed / speed);
            percentage = (percentage > 1) ? 1 : percentage;
            position = startLocation + (distance * easingPattern(_settings, percentage));
            window.scrollTo(0, Math.floor(position));
            if (!stopAnimateScroll(position, endLocation)) {
               animationInterval = window.requestAnimationFrame(loopAnimateScroll);
               start = timestamp;
            }
         };

         /**
          * Reset position to fix weird iOS bug
          * @link https://github.com/cferdinandi/smooth-scroll/issues/45
          */
         if (window.pageYOffset === 0) {
            window.scrollTo(0, 0);
         }

         // Update the URL
         updateURL(anchor, isNum, _settings);

         // If the user prefers reduced motion, jump to location
         if (reduceMotion()) {
            adjustFocus(anchor, Math.floor(endLocation), false);
            return;
         }

         // Emit a custom event
         emitEvent('scrollStart', _settings, anchor, toggle);

         // Start scrolling animation
         smoothScroll.cancelScroll(true);
         window.requestAnimationFrame(loopAnimateScroll);
      };

      /**
       * If smooth scroll element clicked, animate scroll
       */
      var clickHandler = function (event) {

         // Don't run if event was canceled but still bubbled up
         // By @mgreter - https://github.com/cferdinandi/smooth-scroll/pull/462/
         if (event.defaultPrevented) return;

         // Don't run if right-click or command/control + click or shift + click
         if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;

         // Check if event.target has closest() method
         // By @totegi - https://github.com/cferdinandi/smooth-scroll/pull/401/
         if (!('closest' in event.target)) return;

         // Check if a smooth scroll link was clicked
         toggle = event.target.closest(selector);
         if (!toggle || toggle.tagName.toLowerCase() !== 'a' || event.target.closest(settings.ignore)) return;

         // Only run if link is an anchor and points to the current page
         if (toggle.hostname !== window.location.hostname || toggle.pathname !== window.location.pathname || !/#/.test(toggle.href)) return;

         // Get an escaped version of the hash
         var hash;
         try {
            hash = escapeCharacters(decodeURIComponent(toggle.hash));
         } catch (e) {
            hash = escapeCharacters(toggle.hash);
         }

         // Get the anchored element
         var anchor;
         if (hash === '#') {
            if (!settings.topOnEmptyHash) return;
            anchor = document.documentElement;
         } else {
            anchor = document.querySelector(hash);
         }
         anchor = !anchor && hash === '#top' ? document.documentElement : anchor;

         // If anchored element exists, scroll to it
         if (!anchor) return;
         event.preventDefault();
         setHistory(settings);
         smoothScroll.animateScroll(anchor, toggle);
      };

      /**
       * Animate scroll on popstate events
       */
      var popstateHandler = function () {

         // Stop if history.state doesn't exist (ex. if clicking on a broken anchor link).
         // fixes `Cannot read property 'smoothScroll' of null` error getting thrown.
         if (history.state === null) return;

         // Only run if state is a popstate record for this instantiation
         if (!history.state.smoothScroll || history.state.smoothScroll !== JSON.stringify(settings)) return;

         // Get the anchor
         var anchor = history.state.anchor;
         if (typeof anchor === 'string' && anchor) {
            anchor = document.querySelector(escapeCharacters(history.state.anchor));
            if (!anchor) return;
         }

         // Animate scroll to anchor link
         smoothScroll.animateScroll(anchor, null, { updateURL: false });
      };

      /**
       * Destroy the current initialization.
       */
      smoothScroll.destroy = function () {

         // If plugin isn't already initialized, stop
         if (!settings) return;

         // Remove event listeners
         document.removeEventListener('click', clickHandler, false);
         window.removeEventListener('popstate', popstateHandler, false);

         // Cancel any scrolls-in-progress
         smoothScroll.cancelScroll();

         // Reset variables
         settings = null;
         toggle = null;
         fixedHeader = null;
         animationInterval = null;
      };

      /**
       * Initialize Smooth Scroll
       * @param {Object} options User settings
       */
      var init = function () {

         // feature test
         if (!supports()) throw 'Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.';

         // Destroy any existing initializations
         smoothScroll.destroy();

         // Selectors and variables
         settings = extend(defaults, options || {}); // Merge user options with defaults
         fixedHeader = settings.header ? document.querySelector(settings.header) : null; // Get the fixed header

         // When a toggle is clicked, run the click handler
         document.addEventListener('click', clickHandler, false);

         // If updateURL and popState are enabled, listen for pop events
         if (settings.updateURL && settings.popstate) {
            window.addEventListener('popstate', popstateHandler, false);
         }
      };

      // Initialize plugin
      init();

      // Public APIs
      return smoothScroll;
   };

   return SmoothScroll;
})));
