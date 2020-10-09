
const $ = require('jquery');
const {addTask}            = require('./storage');
const {validateText}       = require('./input');
const {checkIfFormIsValid} = require('./form');


$('.js-add-task__form').on('submit', (e) => {
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

  const dataArr = $(e.target).serializeArray();
  const task = {
    name: dataArr[0].value,
    price: parseInt(dataArr[1].value)
  }
  addTask(task);
}