
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

  $(e.target).addClass('input--hasFocus');
}

const closeSelectOptions = (e) => {

  const options = $('.select__box');

  options.each((i, elem) => {

    const option = $(elem);
    const select = $(option).data()['select'];

    if(!(!option.is(e.target) && option.has(e.target).length === 0)) return;

    delete $(option).data()['select'];
    delete $(select).data()['options'];

    $(option).remove();

    $(select).removeClass('input--hasFocus');
  })
}