
const $ = require('jquery');
const { errorTemplate } = require('./templates');


// Label

$('.js-input').on('keyup', (e) => {
  checkIfHasValue(e);
})

const checkIfHasValue = (e) => {
  const length = e.target.value.length;
  
  if(length !== 0) makeHasValue(e.target);
  else             undoHasValue(e.target);
}

const makeHasValue = (input) => {
  $(input).addClass('input--hasValue');
}

const undoHasValue = (input) => {
  $(input).removeClass('input--hasValue');
}


// Validation

$('.js-input[data-validate="text"').on('keyup focusout', (e) => {
  validateText(e);
});

const validateText = (e) => {
  const value = e.target.value;
  const regex = /^[\s\p{L}.-]+$/u;

  if(value.trim().length === 0) {
    makeInvalid(e.target, 'To pole nie może być puste');
    return;
  } else if(!value.match(regex)) {
    makeInvalid(e.target, 'To pole może zawierać duże i małe litery, myślniki i kropki');
    return;
  }
  
  undoInvalid(e.target);
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
