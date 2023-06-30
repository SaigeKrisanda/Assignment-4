const nameRegex = /^[A-Za-z ]{2,}$/;
const facilitatorRegex = /^(Jen|Behdad|Chris|Christian|Josh)$/i;

function setErrorMessage(formControl, errorMessage) {
  formControl.classList.add('error');
  const errorMessageInput = formControl.querySelector('.error-message');
  if (!errorMessageInput.innerHTML.includes(errorMessage)) {
    errorMessageInput.innerHTML += errorMessage + "<br>"; // Append the error message with a line break
  }
  errorMessageInput.style.display = 'block'; // Add this line to make the error message visible
}

function clearError(formControl) {
  return function () {
    if (formControl.classList.contains('error')) {
      formControl.classList.remove('error');
      const errorMessageInput = formControl.querySelector('.error-message');
      errorMessageInput.innerHTML = '';
    }
  };
}

function addErrorReset(formControl) {
  const inputs = formControl.querySelectorAll('input');
  Array.from(inputs).forEach((input) => {
    if (input.type === 'checkbox' || input.type === 'radio') {
      input.addEventListener('change', clearError(formControl));
    } else {
      input.addEventListener('keyup', clearError(formControl));
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');

  const firstNameControl = document.getElementById('firstNameControl');
  addErrorReset(firstNameControl);

  const lastNameControl = document.getElementById('lastNameControl');
  addErrorReset(lastNameControl);

  const facilitatorControl = document.getElementById('facilitatorControl');
  addErrorReset(facilitatorControl);

  const optionsControl = document.querySelector('input[name="options"]');
  const valuesControl = document.querySelectorAll('input[name="values"]');
  const optionsErrorMessage = document.querySelector('#options-error');
  const valuesErrorMessage = document.querySelector('#values-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from being submitted by default

    let isValid = true;
    const firstName = firstNameControl.querySelector('input').value;
    const lastName = lastNameControl.querySelector('input').value;
    const facilitator = facilitatorControl.querySelector('input').value;
    const selectedOption = document.querySelector('input[name="options"]:checked');
    const selectedValues = Array.from(document.querySelectorAll('input[name="values"]:checked'));

    if (!nameRegex.test(firstName)) {
      setErrorMessage(
        firstNameControl,
        '<p>Please enter a valid first name (minimum two characters, only alphabets).</p>'
      );
      isValid = false;
    } else {
      clearError(firstNameControl)();
    }

    if (!nameRegex.test(lastName)) {
      setErrorMessage(
        lastNameControl,
        '<p>Please enter a valid last name (minimum two characters, only alphabets).</p>'
      );
      isValid = false;
    } else {
      clearError(lastNameControl)();
    }

    if (!facilitatorRegex.test(facilitator)) {
      setErrorMessage(
        facilitatorControl,
        '<p>Please enter one of the valid facilitator names: Jen, Behdad, Chris, Christian, or Josh</p>'
      );
      isValid = false;
    } else {
      clearError(facilitatorControl)();
    }

    if (!selectedOption) {
      optionsErrorMessage.innerHTML = '<p>Please choose an option.</p>';
      isValid = false;
    } else {
      optionsErrorMessage.innerHTML = '';
    }

    if (selectedValues.length === 0) {
      setErrorMessage(
        valuesErrorMessage,
        '<p>Please choose at least one value.</p>'
      );
      isValid = false;
    } else {
      clearError(valuesErrorMessage)();
    }

    if (isValid) {
      form.submit(); // Submit the form if it passes validation
    }
  });
});
