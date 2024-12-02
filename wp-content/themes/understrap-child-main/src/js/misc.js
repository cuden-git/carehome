export const chSearch = () => {
  const srchForm = document.getElementById('care-home-select');

  if (!srchForm) return;

  const submitBtn = srchForm.querySelector('[type="submit"]');
  const selectField = srchForm.querySelector('select');

  selectField.addEventListener('change', (e) => {
    if(selectField.value === "") {
      submitBtn.disabled = true;
    }else {
      submitBtn.disabled = false;
    }
  });

}
