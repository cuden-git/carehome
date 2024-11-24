import Splide from '@splidejs/splide';

const carousels = [...document.querySelectorAll('.splide')];

carousels.forEach((item) => {
  let options = {
    type: "fade",
    rewind: true,
    arrows: (item.hasAttribute('data-arrows'))? true : false,
  }
  
  if(item.hasAttribute('data-splide-bp')) {
    let bp = parseInt(item.getAttribute('data-splide-bp'));
    options.mediaQuery = 'min';
    options.breakpoints = {
      [bp]: {
        destroy: true,
      },
    }
  }
  
  console.log('options = ', options);
    new Splide( item, options ).mount();
});
