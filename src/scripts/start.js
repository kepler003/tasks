
const $ = require('jquery');
const Table = require('./Table');


$(document).ready(() => {
  const TableTemplate = renderTable();
});


const renderTable = () => {
  const parent = $('.js-tasks');
  const TableTemplate = new Table(parent);
  TableTemplate.render();
  return TableTemplate;
}