
const $ = require('jquery');


$('.js-form').find('.js-input').on('keyup focusout change', (e) => {
  validateForm($(e.target).parents('.js-form'));
})

const validateForm = (form) => {
  checkIfFormIsValid(form) ? makeValid(form) : makeInvalid(form);
}

const makeValid = (form) => {
  form.removeClass('form--invalid');
}

const makeInvalid = (form) => {
  form.addClass('form--invalid');
}

const checkIfFormIsValid = (form) => {
  return form.find('.input--invalid').length === 0;
}


module.exports = {
  validateForm,
  checkIfFormIsValid
}