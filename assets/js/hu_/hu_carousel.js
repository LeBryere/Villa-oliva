let leb__carousel, next, prev, items;
leb__carousel = document.querySelector('.leb__carousel');
items = document.querySelectorAll('.leb__carousel-item');

next = (el) => {
   // Ellenőrzi, hogy van-e következő elem
   if (el.nextElementSibling !== null) {
      return el.nextElementSibling;
   } else {
      return items[0]; // Ha nincs, akkor válassza ki az első elemet
   }
};

prev = (el) => {
   // Ellenőrzi, hogy van-e előző elem
   if (el.previousElementSibling !== null) {
      return el.previousElementSibling;
   } else {
      return items[items.length - 1]; // Ha nincs, akkor válassza ki az utolsó elemet
   }
};

// Eseményfigyelő hozzáadása a 'toggle' elemekhez
document.querySelectorAll('.toggle').forEach((item) => {
   item.addEventListener('click', (e) => {
      let el, new_item;
      el = document.querySelector('.set-forward');
      el.classList.remove('set-forward'); // Előző 'set-forward' osztály eltávolítása

      // Ternáris operátor használata az új elem kiválasztásához a 'data-toggle' attribútum alapján
      new_item = (item.getAttribute('data-toggle') === 'next') ? next(el) : prev(el);

      // A 'moves-back' osztályt a 'leb__carousel' elemre a ternáris operátor alapján kapcsolja át
      leb__carousel.classList.toggle('moves-back', item.getAttribute('data-toggle') !== 'next');

      // Hozzáadja a 'set-forward' osztályt, és beállítja az új elem 'order' tulajdonságát 1-re
      new_item.classList.add('set-forward');
      new_item.style.order = 1;

      // Az elemek 'order' tulajdonságának beállítása a megfelelő sorrendben
      for (let i = 2; i <= items.length; i++) {
         new_item = next(new_item);
         new_item.style.order = i;
      }

      // A 'set-move' osztály eltávolítása és hozzáadása a 'leb__carousel' elemhez késleltetéssel
      leb__carousel.classList.remove('set-move');
      setTimeout(() => {
         leb__carousel.classList.add('set-move');
      }, 10);
   });

   // 'aria-label' attribútum hozzáadása a prev és next gombokhoz
   if (item.getAttribute('data-toggle') === 'next') {
      item.setAttribute('aria-label', 'Következő');
   } else {
      item.setAttribute('aria-label', 'Előző');
   }
});

// Billentyűzetes navigáció
document.addEventListener('keydown', function (ev) {
   var keyCode = ev.keyCode || ev.which;
   switch (keyCode) {
      case 37:
         nextSlide(); // Hívja meg a megfelelő függvényt a következő diára való navigáláshoz
         break;
      case 39:
         prevSlide(); // Hívja meg a megfelelő függvényt az előző diára való navigáláshoz
         break;
   }
});

// A következő dia navigálásához függvény meghatározása
function nextSlide() {
   // Az aktuális diát a 'set-forward' osztállyal jelöli meg
   let currentSlide = document.querySelector('.set-forward');

   // A következő dia kiválasztása a 'next' függvénnyel
   let newSlide = next(currentSlide);

   // Az animációt irányító osztályok eltávolítása
   leb__carousel.classList.remove('moves-back');
   leb__carousel.classList.remove('set-move');

   // Az aktuális diáról eltávolítja a 'set-forward' osztályt
   currentSlide.classList.remove('set-forward');

   // Hozzáadja a 'set-forward' osztályt az új diához, és beállítja az 'order' tulajdonságát 1-re
   newSlide.classList.add('set-forward');
   newSlide.style.order = 1;

   // Az állomány többi részének újrasorszámozása
   for (let i = 2; i <= items.length; i++) {
      newSlide = next(newSlide);
      newSlide.style.order = i;
   }

   // A 'set-move' osztály hozzáadása rövid késleltetéssel az animáció aktiválásához
   setTimeout(() => {
      leb__carousel.classList.add('set-move');
   }, 10);
}

// Az előző dia navigálásához függvény meghatározása
function prevSlide() {
   // Az aktuális diát a 'set-forward' osztállyal jelöli meg
   let currentSlide = document.querySelector('.set-forward');
   // A következő dia kiválasztása a 'prev' függvénnyel
   let newSlide = prev(currentSlide);

   // Az animációt irányító osztályok hozzáadása
   leb__carousel.classList.add('moves-back');
   // Az animációt irányító osztályok eltávolítása
   leb__carousel.classList.remove('set-move');

   // Az aktuális diáról eltávolítja a 'set-forward' osztályt, és beállítja az 'order' tulajdonságát 1-re
   currentSlide.classList.remove('set-forward');
   newSlide.classList.add('set-forward');
   newSlide.style.order = 1;

   // Az állomány többi részének újrasorszámozása
   for (let i = 2; i <= items.length; i++) {
      newSlide = next(newSlide);
      newSlide.style.order = i;
   }
   // A 'set-move' osztály hozzáadása rövid késleltetéssel az animáció aktiválásához
   setTimeout(() => {
      leb__carousel.classList.add('set-move');
   }, 10);
}
