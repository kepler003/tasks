
const $ = require('jquery');
const { addTask } = require('./storage');


$('.js-add-task__form').on('submit', (e) => {
  e.preventDefault();
  createTask(e);
});


const createTask = (e) => {
  const dataArr = $(e.target).serializeArray();
  const task = {
    name: dataArr[0].value,
    price: parseInt(dataArr[1].value)
  }
  addTask(task);
}