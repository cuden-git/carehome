class JumpMenu {
  constructor() {
    this.menus = document.querySelectorAll('[data-jump-menu]');

    this.setEvent();
  }

  setEvent() {
    this.menus.forEach((menu) => {
      menu.addEventListener('change', () => {
        window.location = menu.value;
      })
    });
  }
}

export default JumpMenu;
