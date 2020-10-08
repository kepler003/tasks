
const $ = require('jquery');
const Options = require('./Options');


$('.js-select').on('click', (e) => {
  openOptions(e);
})

const openOptions = (e) => {
  const selectOptions = new Options(e.target);
  selectOptions.render();

  setTimeout(() => {
    selectOptions.remove();
  }, 2000);
}