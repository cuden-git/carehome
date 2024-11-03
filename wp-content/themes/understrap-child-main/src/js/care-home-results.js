class CareHomeResults {
  constructor() {
    this.stage = document.getElementById('care-homes-list');

    if(!this.stage) {
      return;
    }

    this.attachEvents();
  }

  attachEvents() {
    this.stage.addEventListener('searchSubmitted', (e) => {
      alert(e.detail.location);
    });
  }
}

export default CareHomeResults;
