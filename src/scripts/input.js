
const $ = require('jquery');
const { errorTemplate } = require('./templates');


// Label

$('.js-input').on('keyup', (e) => {
  checkIfHasValue($(e.target));
})

const checkIfHasValue = (input) => {
  const length = $(input).val().length;
  
  if(length !== 0) makeHasValue(input);
  else             undoHasValue(input);
}

const makeHasValue = (input) => {
  $(input).addClass('input--hasValue');
}

const undoHasValue = (input) => {
  $(input).removeClass('input--hasValue');
}


// Validation

$('.js-input[type=number]').on('keyup focusout', (e) => {
  removeZeros($(e.target));
  checkIfHasValue($(e.target));
})

$('.js-input[data-text]').on('keyup focusout', (e) => {
  validateText($(e.target));
});

$(document).on('keyup focusout', '.js-input[data-filled]:not(.input--hasFocus)', (e) => {
  validateNotEmpty($(e.target));
})

$('.js-input[data-minlength]').on('focusout', (e) => {
  validateMinLength($(e.target));
})

$('.js-input[data-numbers]').on('keyup focusout', (e) => {
  validateNumbers($(e.target));
})

$('.js-input[data-min]').on('keyup focusout', (e) => {
  validateNumbers($(e.target));
  validateMin($(e.target));
})

$('.js-input[data-step]').on('keyup focusout', (e) => {
  validateStep($(e.target));
  validateNumbers($(e.target));
})


const validateText = (input) => {
  const value = $(input).val();
  const regex = /^[\s\p{L}.-]+$/u;

  if(value.trim().length === 0) {
    makeInvalid(input, 'To pole nie może być puste');
    return;
  } else if(!value.match(regex)) {
    makeInvalid(input, 'To pole może zawierać tylko duże i małe litery, myślniki i kropki');
    return;
  };
  
  undoInvalid(input);
}

const validateNotEmpty = (input) => {
  const value = input.val();

  if(value.trim().length === 0) {
    makeInvalid(input, 'To pole nie może być puste');
    return;
  };
  
  undoInvalid(input);
}

const validateMinLength = (input) => {
  const value = input.val();
  const minLength = input.data('minlength');

  if(value.trim().length < minLength) {
    makeInvalid(input, `To pole musi zawierać przynajmniej ${minLength} znaków`);
    return;
  };
  
  undoInvalid(input);
}

const validateNumbers = (input) => {
  const value = input.val();
  const regex = /^[-0-9]*$/;

  if(!value.match(regex)) {
    makeInvalid(input, 'To pole może zawierać tylko liczby');
    return;
  };
  
  undoInvalid(input);
}

const validateMin = (input) => {
  const value = input.val();
  const min = input.data('min');

  if(value && value < min) {
    input.val(min);
    removeZeros(input);
  };
}

const validateStep = (input) => {
  const value = input.val();
  const step = input.data('step');
  const modulo = value % step;

  if(modulo) {
    input.val(value - modulo);
  }
}

const removeZeros = (input) => {
  const value = input.val();
  if(value.toString().length > 1) input.val(value.replace(/\b0+/g, ''));
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


module.exports = {
  makeHasValue,
  validateText,
  checkIfHasValue,
  validateNotEmpty,
  validateMinLength,
  validateNumbers,
  validateMin,
  validateStep
}


