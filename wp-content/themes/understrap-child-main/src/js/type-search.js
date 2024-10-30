class TypeSearch {
  constructor() {
    this.namespace = 'type-search';
    this.resultActive = false;
    this.searchInputs = [...document.querySelectorAll('.' + this.namespace)];
    this.attachEvents();
    this.inputVal;
    this.gmapURL = `${themeData.gmURL}place/autocomplete/json?key=${themeData.gmKey}&components=country:uk&input=`;
  }

  debounce(cbFnc, timeout = 2000) {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { cbFnc(...args) }, timeout);
    };
  }

  output(field, val) {

    if(val.length > 2) {
      //alert(this.gmapURL + val);
      field.innerHTML = val;
      field.classList.add(this.namespace + '__results--active');
      this.fetchSuggestions(val);
    }else {
      field.innerHTML = '';
      field.classList.remove(this.namespace + '__results--active');
    }

    this.inputVal = val;
  }

  attachEvents() {
    this.searchInputs.forEach((item) => {
      let inputField = item.querySelector('.' + this.namespace + '__input');
      let resultsField = item.querySelector('.' + this.namespace + '__results');
      let handler = this.debounce(() => this.output(resultsField,inputField.value));

      if(inputField) {
        inputField.addEventListener('keyup', (e) => {
          handler();
        })
      }
    });
  }

  async fetchSuggestions(val) {
    try {
      let response = await fetch(this.gmapURL + val);
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      let json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default TypeSearch;
