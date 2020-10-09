
const $ = require('jquery');


$('.js-form').find('.js-input').on('keyup focusout change', (e) => {
  validateForm($(e.target).parents('.js-form'));
})

const validateForm = (form) => {
  checkIfInputsAreValid(form) ? makeValid(form) : makeInvalid(form);
}

const makeValid = (form) => {
  form.removeClass('form--invalid');
}

const makeInvalid = (form) => {
  form.addClass('form--invalid');
}

const checkIfInputsAreValid = (form) => {
  const inputs = form.find('.input--invalid');
  return !inputs.length;
}