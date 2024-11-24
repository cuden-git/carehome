class TypeSearch {
  constructor(evTarget) {
    this.namespace = 'type-search';
    this.resultActive = false;
    this.searchForm = [...document.querySelectorAll('.' + this.namespace)];

    if(this.searchForm.length === 0) {
      return;
    }

    this.attachEvents();
    this.inputVal;
    this.gmapURL = `${themeData.gmURL}place/autocomplete/json?key=${themeData.gmKey}&components=country:uk&input=`;
    this.locationRes;
    this.evTarget = evTarget;
   // this.gmPlaces();//https://carehome.test/wp-json/
  }

  debounce(cbFnc, timeout = 300) {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { cbFnc(...args) }, timeout);
    };
  }

  async output(field, val) {

    if(val.length >= 2) {      
      field.classList.add(this.namespace + '__results--active');
      field.innerHTML = await this.fetchSuggestions(val);//
    }else {
      field.innerHTML = '';
      field.classList.remove(this.namespace + '__results--active');
    }

    this.inputVal = val;
  }

  attachEvents() {
    this.searchForm.forEach((item) => {
      let inputField = item.querySelector('.' + this.namespace + '__input');
      let resultsField = item.querySelector('.' + this.namespace + '__results');
      let btn = item.querySelector('.' + this.namespace + '__btn');
      let handler = this.debounce(() => this.output(resultsField,inputField.value));
  
      if(item.tagName === "FORM") {
        item.addEventListener('submit', (e) => {
         // e.preventDefault();
         // this.setFormParams(item, inputField.value);
        });
      }

      if(inputField) {
        inputField.addEventListener('keyup', (e) => {
          handler();
        })

        if(resultsField) {
          resultsField.addEventListener('click', () => {
            this.locationRes = resultsField.innerHTML;
            this.createEvent();
            inputField.value = resultsField.innerHTML;
            resultsField.innerHTML = '';
            resultsField.classList.remove(this.namespace + '__results--active');

            if(btn) {
              btn.disabled = false;
            }
          })
        }
      }
    });
  }

  async fetchSuggestions(val) {
    let json;
    try {
      let response = await fetch(themeData.restURL + 'quantum-care/v1/location-suggestion/' + val);

      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      json = await response.json();

      this.locationRes = json;
    } catch (error) {
      console.error(error.message);
    }

    return json;
  }

  createEvent() {
    if(this.evTarget) {
      this.formEvent = new CustomEvent('searchSubmitted', { detail:{
          location: this.locationRes
        }
      });

      this.evTarget.dispatchEvent(this.formEvent);
    }
  }

  getLocationVar() {
    return this.locationRes;
  }

  setFormParams(form, val) {
    const paramKey = 'location';
    const paramVal = val;
    let formURL = new URL(form.action)

    formURL.searchParams.set(paramKey, paramVal);
    form.action = formURL.toString();
    window.location.href = form.action;
  }
  // async gmPlaces() {
  //   await google.maps.importLibrary("places");

  //   // Create the input HTML element, and append it.
  //   //@ts-ignore
  //   const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement();

  //   //@ts-ignore
  //   document.body.appendChild(placeAutocomplete);
  // }
}

export default TypeSearch;
