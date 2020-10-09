
const $ = require('jquery');
const Options              = require('./components/Options');
const {setChosenEmployee}  = require('./database/storage');
const {validateText}       = require('./utils/input');
const {checkIfFormIsValid} = require('./utils/form');


$('.js-form--credentials').on('submit', function(e) {
  e.preventDefault();
  validateForm(e);
  submitForm(e);
});

$('.js-select').on('click', (e) => {
  openOptions(e);
})


const validateForm = (e) => {
  const dataText = $(e.target).find('.js-input[data-text]');
  if(dataText.length) validateText($(dataText));
}

const submitForm = (e) => {
  if(!checkIfFormIsValid($(e.target))) return;

  const userId = $(e.target).find('.js-select[name="employee"]').data('userId');
  setChosenEmployee(userId);
}

const openOptions = (e) => {
  const selectOptions = new Options(e.target);
  selectOptions.render();
}