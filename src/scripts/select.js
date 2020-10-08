
const $ = require('jquery');
const {optionsTemplate} = require('./templates');


$('.js-select').on('click', (e) => {
  openSelectOptions(e);
})

$(document).on('mouseup', (e) => {
  closeSelectOptions(e);
})


const openSelectOptions = (e) => {
  const height = e.target.offsetHeight;
  const width  = e.target.offsetWidth;
  const offset = $(e.target).offset();

  const selectOptions = $(optionsTemplate()).css({
    'width': width,
    'left' : offset.left + 'px',
    'top'  : offset.top + height + 'px'
  });

  $('body').append(selectOptions);

  $(e.target)     .data({ options: selectOptions });
  $(selectOptions).data({ select:  $(e.target) });
}

const closeSelectOptions = (e) => {

  const options = $('.select__box');

  options.each((i, elem) => {

    const option = $(elem);

    if(!(!option.is(e.target) && option.has(e.target).length === 0)) return;

    delete $($(option).data()['select']).data()['options'];
    delete $(option).data()['select'];

    $(option).remove();
  })
}