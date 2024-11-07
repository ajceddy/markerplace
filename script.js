const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

/********************************************************************** */
/*******************INITIALISE SWIPER JS****************************** */
/******************************************************************** */
new Swiper(".card-wrapper", {
  loop: true,
  spaceBetween: 30,

  // pagination bullets
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      sliderPreview: 1,
    },
    768: {
      sliderPreview: 3,
    },
    1024: {
      sliderPreview: 5,
    },
  },
});
