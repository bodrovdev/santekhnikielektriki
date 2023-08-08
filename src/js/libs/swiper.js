import Swiper from 'swiper/bundle';

// ? Мобильный слайдер
// var mobile_slider_init = false;

// function mobile_slider() {
//   if (window.innerWidth <= 1024) {
//     if (!mobile_slider_init) {
//       mobile_slider_init = true;

//       var mobile_slider = new Swiper(".mobile-slider-class", {
//         direction: "horizontal",
//         spaceBetween: 25,

//         breakpoints: {
//           320: {
//             slidesPerView: 1
//           },
//           768: {
//             slidesPerView: "auto"
//           },
//         },

//         pagination: {
//           el: ".mobile-slider-class__pagination",
//           clickable: true,
//         },

//       });
//     }
//   } else if (mobile_slider_init) {
//     mobile_slider.destroy();
//     mobile_slider_init = false;
//   }
// }
// mobile_slider();
// window.addEventListener("resize", mobile_slider);

// ? Обычный слайдер
// let regular_slider = new Swiper(".regular-slider-class", {
//   direction: "horizontal",
//   spaceBetween: 25,

//   breakpoints: {
//     320: {
//       slidesPerView: 1
//     },
//     768: {
//       slidesPerView: "auto",
//     },
//   },

//   navigation: {
//     nextEl: '.regular-slider-class__arrow--next',
//     prevEl: '.regular-slider-class__arrow--prev',
//   },

//   pagination: {
//     el: ".regular-slider-class__pagination",
//     clickable: true,
//   },
// });