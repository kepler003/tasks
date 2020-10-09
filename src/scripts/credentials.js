
const $ = require('jquery');
const {setChosenEmployee}  = require('./storage');
const {validateText}       = require('./input');
const {checkIfFormIsValid} = require('./form');


$('.js-form--credentials').on('submit', function(e) {
  e.preventDefault();
  validateForm(e);
  submitForm(e);
});


const validateForm = (e) => {
  const dataText = $(e.target).find('.js-input[data-text]');
  if(dataText.length) validateText($(dataText));
}

const submitForm = (e) => {
  if(!checkIfFormIsValid($(e.target))) return;

  const userId = $(e.target).find('.js-select[name="employee"]').data('userId');
  setChosenEmployee(userId);
}