class MenuCollapse {
  constructor(bp) {
    this.bp = bp;
    this.menus = [...document.querySelectorAll('.menu-collapse')];
    this.addEvents();
  }

  addEvents() {
    this.menus.forEach((menu) => {
      let list = menu.querySelector('ul');
      let items = [...menu.querySelectorAll('li')];
      let displayArea = menu.querySelector('.menu-collapse__display');
      let displayAreaText = displayArea.querySelector('span');
      let currentPageLink = menu.querySelector('li.current');

      menu.addEventListener('click', () => {
        menu.classList.toggle('menu-collapse--open');

        // if(menu.classList.contains('menu-collapse--open')) {
        //   let scrollH = list.scrollHeight + "px";
        //   list.style.height = "0px";
        //   list.style.height = scrollH;
        // }else {
        //   list.style.height = "";
        // }
      })

      items.forEach((item, index) => {
        let displayText = (currentPageLink)? currentPageLink.innerText : items[0].innerText;

        displayAreaText.innerHTML = displayText;

        item.addEventListener('click', () => {
          displayAreaText.innerHTML = item.innerText;
        });
      });
    });

    window.addEventListener('resize', this.debounce((e) => {
      let vpWidth = window.innerWidth;

      if(vpWidth > this.bp) {
        this.menus.forEach((menu) => {
          let list = menu.querySelector('ul');
          list.style.height = "";
          menu.classList.remove('menu-collapse--open');
        });
      }
    }))
  }

  debounce(cbFnc, timeout = 300) {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { cbFnc(...args) }, timeout);
    };
  }
}

export default MenuCollapse;
