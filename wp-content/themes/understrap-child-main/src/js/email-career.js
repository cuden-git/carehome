class EmailCareer {
  constructor() {
    this.form = document.getElementById('career-email');

    if(!this.form) {
      return;
    }

    this.emailInput = this.form.querySelector('[type=email');
    this.submitBtn = this.form.querySelector('[type=submit');
    this.addEvent();
  }

  addEvent() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let responseMsg;
      let postID = themeData.postID;
      let emailAddress = this.emailInput.value;
      let response = await fetch(themeData.restURL + 'quantum-care/v1/email-job-spec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: emailAddress,
            post_id: postID,
        }),
      });

      let json = await response.json();

      if(response.status === 200) {
        this.removeForm();
      }

      this.responseMessage(json.message)
      console.log(json);
    });

    this.emailInput.addEventListener('input', () => {
      if(this.emailInput.validity.valid) {
        this.submitBtn.disabled = false;
      }
    });
  }

  responseMessage(msg) {
    let msgEle = document.createElement('div');
    let textNode = document.createTextNode(msg);
    msgEle.classList.add('career-single__info-form-msg');
    msgEle.appendChild(textNode);
    this.form.appendChild(msgEle);
  }

  removeForm() {
    this.emailInput.remove();
    this.submitBtn.remove();
  }
}

export default EmailCareer;
