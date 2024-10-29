class TypeSearch {
  constructor() {
    this.namespace = 'type-search';
    this.resultActive = false;
    this.searchInputs = [...document.querySelectorAll('.' + this.namespace)];
    this.attachEvents();
  }

  output(field, val) {

    if(val.length > 2) {
      field.innerHTML = val;
      field.classList.add(this.namespace + '__results--active');
    }
  }

  attachEvents() {
    this.searchInputs.forEach((item) => {
      let inputField = item.querySelector('.' + this.namespace + '__input');
      let resultsField = item.querySelector('.' + this.namespace + '__results');

      if(inputField) {
        inputField.addEventListener('keyup', (e) => {
          this.output(resultsField,inputField.value);
        })
      }
    });
  }
}

export default TypeSearch;
