
const $ = require('jquery');
const {chooseEmployee} = require('./storage');


$(document).on('click', '.js-user-card--select', (e) => {
  chooseUser(e);
})


const chooseUser = (e) => {
  // Choose user in database
  // Close select
}