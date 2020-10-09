
const $ = require('jquery');
const Table = require('./Table');


$(document).ready(() => {
  renderTable();
});


const renderTable = () => {
  const parent = $('.js-tasks');
  const TableTemplate = new Table(parent);
  TableTemplate.render();
}