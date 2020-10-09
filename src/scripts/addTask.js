
const $ = require('jquery');
const Table = require('./components/Table');
const {addTask}            = require('./database/storage');
const {validateText}       = require('./utils/input');
const {checkIfFormIsValid} = require('./utils/form');


$('.js-add-task__form').on('submit', (e) => {
  e.preventDefault();
  validateForm(e);
  submitForm(e);
});

$(document).ready(() => {
  renderTable();
});


const validateForm = (e) => {
  const invalidTextInputs = $(e.target).find('.js-input[data-text]');
  if(invalidTextInputs.length) validateText($(invalidTextInputs));
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

const renderTable = () => {
  const parent = $('.js-tasks');
  const TableTemplate = new Table(parent);
  TableTemplate.render();
}