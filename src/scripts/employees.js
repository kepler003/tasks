
const $ = require('jquery');
const {searchByName} = require('./storage');
const {optionTemplate, userCardTemplate} = require('./templates');


$(document).on('keyup', '.js-employees__search', (e) => {
  searchEmployees(e);
})

const searchEmployees = (e) => {
  const list = $(e.target).parents('.select__box').children('.select__list')[0];
  const name = e.target.value.trim();

  if(!name.length) {
    removeEmployees(list);
    return;
  }
  
  const employees = searchByName(name);
  
  if(!employees) {
    removeEmployees(list);
    return;
  }

  updateEmployees(employees, list);
}

const updateEmployees = (employees, list) => {
  removeEmployees(list);
  renderEmployees(employees, list);
}

const renderEmployees = (employees, list) => {
  removeEmployees(list);
  employees.forEach(employee => renderEmployee(employee, list));
}

const renderEmployee = (employee, list) => {
  const li = $(optionTemplate());
  const userCard = $(userCardTemplate({
    name:     employee.name,
    src:      employee.src,
    isChosen: employee.isChosen
  }, {
    cardClass: 'js-user-card--select'
  }));
  
  li.append(userCard);
  $(list).append(li);
}

const removeEmployees = (list) => {
  $(list).children('li').remove();
}