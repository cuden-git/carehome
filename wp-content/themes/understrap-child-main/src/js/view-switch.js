class ViewSwitch {
  constructor() {
    this.btn = document.getElementById('archive-switcher');

    if(!this.btn) {
      return;
    }
    this.currIndex;
    this.views = [...document.querySelectorAll('[data-view-switch]')];
    this.addEvents();

    this.views.forEach((item, index) => {
      if(item.classList.contains('active')) {
        this.currIndex = index;
      }
    });
  }

  addEvents() {
    this.btn.addEventListener('click', (e) => {
      e.preventDefault;
      this.btn.disabled = true;
      this.setAnim(this.views[this.currIndex]);
      this.currIndex = (this.currIndex === this.views.length - 1)? 0 : this.currIndex + 1;
      this.setAnim(this.views[this.currIndex], true);
     // this.views[this.currIndex].classList.remove('d-none');
    })
  }

  setAnim(ele, fadeIn = false) {
    if(fadeIn === false) {
      ele.classList.add('fade-out');
    }else {
      ele.classList.add('fade-in');
      ele.classList.remove('d-none');
    }

    ele.addEventListener('animationend', (e) => {console.log('e', e);
      if(e.animationName === 'fade-out') {
        ele.classList.remove('fade-out', 'active');
        ele.classList.add('d-none');
        console.log('fade out end');
      }
      if(e.animationName === 'fade-in') {
        ele.classList.remove('fade-in');
        ele.classList.add('active');
        console.log('fade out in');
      }

      this.btn.disabled = false;
    });
  }
}

export default ViewSwitch;
