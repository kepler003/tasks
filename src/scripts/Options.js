
const $ = require('jquery');
const {searchByName} = require('./storage');

class Options {
  constructor(select) {
    this.select       = $(select);
    this.parent       = $('body');
    this.employees    = undefined;
    this.config       = {
      "width" : `${$(select).outerWidth()}px`,
      "top"   : `${$(select).offset().top + $(select).height()}px`,
      "left"  : `${$(select).offset().left}px`
    }
    this.template     = $(this.getTemplate()).css(this.config);
    this.input        = this.template.find('.js-input--select-search');
    this.list         = this.template.find('.select__list');
    this.listElements = undefined;

    this.setUpListeners();
  }

  getTemplate() {
    return `
      <div class="select__box">
        <div class="select__header">
          <div class="input__box input__box--no-margin">
            <input
              class="input--search input--gray js-input--select-search"
              placeholder="Szukaj"
            >
            <i class="fas fa-search input__icon"></i>
          </div>
        </div>
        <ul class="select__list">
        </ul>
      </div>
    `
  }

  setUpListeners() {
    $(document).on(`mouseup.options`, (e) => {
      this.checkIfClickedOutside(e);
    });

    $(this.input).on(`keyup`, () => {
      this.searchEmployees();
    });
  }

  removeListeners() {
    $(document).off(`mouseup.options`);
    $(this.input).off(`keyup`);
  }

  checkIfClickedOutside(e) {
    if(!this.template.is(e.target) && this.template.has(e.target).length === 0) {
      this.remove();
    }
  }

  searchEmployees() {
    const name = this.input.val();
    this.employees = searchByName(name);

    this.renderEmployees();
  }

  renderEmployees() {
    this.employees.forEach(employee => {
      this.renderEmployee(employee);
    })
  }

  renderEmployee(employee) {
    this.list.append(`<p>Employee</p>`)
  }

  render() {
    $(this.parent).append(this.template);
    this.select.addClass('input--hasFocus');
  }
  
  remove() {
    this.template.remove();
    this.removeListeners();
    this.select.removeClass('input--hasFocus');
  }
}


module.exports = Options;