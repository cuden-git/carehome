class MenuCollapse {
  constructor() {
    this.bp = 767;
    this.vpWidth = window.innerWidth;
    this.menus = [...document.querySelectorAll('.menu-collapse')];
    this.addEvents();
  }

  addEvents() {
    this.menus.forEach((menu) => {
      let items = [...menu.querySelectorAll('li')];
      let displayArea = menu.querySelector('.menu-collapse__display');

      menu.addEventListener('click', () => {
        menu.classList.toggle('menu-collapse--open');
      })

      items.forEach((item, index) => {
        if(index === 0) {
          displayArea.innerHTML = item.innerText;
        }

        item.addEventListener('click', () => {
          displayArea.innerHTML = item.innerText;
        });
      });
    });
  }
}

export default MenuCollapse;
