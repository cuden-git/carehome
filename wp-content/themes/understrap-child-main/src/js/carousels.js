import Swiper from 'swiper/bundle';
//import 'swiper/css/bundle';

const carousels = [...document.querySelectorAll('.swiper')];

carousels.forEach((item) => {
  const swiper = new Swiper(item, {
    // Optional parameters
    direction: 'vertical',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
})

