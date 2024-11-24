import Splide from '@splidejs/splide';

const carousels = [...document.querySelectorAll('.splide')];

carousels.forEach((item) => {
  new Splide( item, {
    type: "fade",
    rewind: true,
    arrows: (item.hasAttribute('data-arrows'))? true : false,
  } ).mount();
});
