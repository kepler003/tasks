
const $     = require('jquery');
const Table = require('./components/Table');


$(document).ready(() => {
  renderTable();
});


const renderTable = () => {
  const parent = $('.js-tasks');
  const TableTemplate = new Table(parent);
  TableTemplate.render();
}