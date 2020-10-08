
const $ = require('jquery');
const { errorTemplate } = require('./templates');


// Label

$('.js-input').on('keyup', (e) => {
  checkIfHasValue(e);
})

const checkIfHasValue = (e) => {
  const length = e.target.value.length;
  const badInput = e.target.validity.badInput;
  
  if(length !== 0 || badInput) makeHasValue(e.target);
  else                         undoHasValue(e.target);
}

const makeHasValue = (input) => {
  $(input).addClass('input--hasValue');
}

const undoHasValue = (input) => {
  $(input).removeClass('input--hasValue');
}


// Validation

$('.js-input[type=number]').on('keyup focusout', (e) => {
  removeZeros(e);
  checkIfHasValue(e);
})

$('.js-input[data-text]').on('keyup focusout', (e) => {
  validateText(e);
});

$('.js-input[data-filled]').on('keyup focusout', (e) => {
  validateNotEmpty(e);
})

$('.js-input[data-minlength]').on('focusout', (e) => {
  validateMinLength(e);
})

$('.js-input[data-numbers]').on('keyup focusout', (e) => {
  validateNumbers(e);
})

$('.js-input[data-min]').on('keyup focusout', (e) => {
  validateMin(e);
  validateNumbers(e);
})

$('.js-input[data-step]').on('keyup focusout', (e) => {
  validateStep(e);
  validateNumbers(e);
})


const validateText = (e) => {
  const value = e.target.value;
  const regex = /^[\s\p{L}.-]+$/u;

  if(value.trim().length === 0) {
    makeInvalid(e.target, 'To pole nie może być puste');
    return;
  } else if(!value.match(regex)) {
    makeInvalid(e.target, 'To pole może zawierać tylko duże i małe litery, myślniki i kropki');
    return;
  };
  
  undoInvalid(e.target);
}

const validateNotEmpty = (e) => {
  const value = e.target.value;

  if(value.trim().length === 0) {
    makeInvalid(e.target, 'To pole nie może być puste');
    return;
  };
  
  undoInvalid(e.target);
}

const validateMinLength = (e) => {
  const value = e.target.value;
  const minLength = e.target.attributes['data-minlength'].value;

  if(value.trim().length < minLength) {
    makeInvalid(e.target, `To pole musi zawierać przynajmniej ${minLength} znaków`);
    return;
  };
  
  undoInvalid(e.target);
}

const validateNumbers = (e) => {
  const value = e.target.value;
  const badInput = e.target.validity.badInput;
  const regex = /^[-0-9]*$/;

  if(!value.match(regex)) {
    makeInvalid(e.target, 'To pole może zawierać tylko liczby');
    return;
  } else if(badInput) {
    makeInvalid(e.target, 'Nieprawidłowa wartość');
    return;
  }
  
  undoInvalid(e.target);
}

const validateMin = (e) => {
  const value = e.target.value;
  const min = e.target.attributes['data-min'].value;

  if(value && value < min) {
    e.target.value = min;
    removeZeros(e);
  };
}

const validateStep = (e) => {
  const value = e.target.value;
  const step = e.target.attributes['data-step'].value;
  const modulo = value % step;

  if(modulo) {
    e.target.value = value - modulo;
  }
}

const removeZeros = (e) => {
  const value = e.target.value;
  if(value.toString().length > 1) e.target.value = value.replace(/\b0+/g, '');
}


const makeInvalid = (input, message) => {
  styleInvalid(input);
  addError(input, message);
}

const undoInvalid = (input) => {
  unstyleInvalid(input);
  removeError(input);
}


const styleInvalid = (input) => {
  $(input).addClass('input--invalid');
}

const unstyleInvalid = (input) => {
  $(input).removeClass('input--invalid');
}


const addError = (input, message) => {
  const error = $(input).siblings('.input__error')[0];
  const inputBox = $(input).parent('.input__box');
  
  if(!error) {
    $(inputBox).append(errorTemplate(message));
  } else {
    $(error).text(message);
  }
}

const removeError = (input) => {
  const error = $(input).siblings('.input__error')[0];
  $(error).remove();
}
