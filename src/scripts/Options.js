
const $ = require('jquery');
const {searchByName} = require('./storage');
const Option         = require('./Option');


class Options {
  constructor(select) {
    this.select     = $(select);
    this.parent     = $('body');
    this.employees  = undefined;
    this.style      = {
      "width" : `${$(select).outerWidth()}px`,
      "top"   : `${$(select).offset().top + $(select).height()}px`,
      "left"  : `${$(select).offset().left}px`
    }
    this.template   = $(this.getTemplate()).css(this.style);
    this.input      = this.template.find('.js-input--select-search');
    this.searchName = undefined;
    this.list       = this.template.find('.select__list');
    this.templates  = {
      employees: []
    };

    this.addListeners();
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
        <ul class="select__list"></ul>
      </div>
    `
  }

  addListeners() {
    $(document).on(`mouseup.options`, (e) => {
      this.checkIfClickedOutside(e);
    });

    $(this.input).on(`keyup`, () => {
      this.searchEmployees();
    });

    $(window).on('click.optionsPosition, resize.optionsPosition, orientationchange.optionsPosition, keyup.optionsPosition', () => {
      this.updatePosition();
    })
  }

  removeListeners() {
    $(document).off(`mouseup.options`);
    $(this.input).off(`keyup`);

    this.templates.employees.forEach(templateEmployee => {
      templateEmployee.removeListeners();
    })

    $(window).off('click.optionsPosition, resize.optionsPosition, orientationchange.optionsPosition, keyup.optionsPosition');
  }

  checkIfClickedOutside(e) {
    if(!this.template.is(e.target) && this.template.has(e.target).length === 0) {
      this.remove();
    }
  }

  searchEmployees() {
    this.searchName = this.input.val();
    this.employees = searchByName(this.searchName);

    this.updateEmployees();
  }

  updateEmployees() {
    this.removeEmployees();
    this.renderEmployees();
  }

  renderEmployees() {
    this.employees.forEach(employee => {
      this.renderEmployee(employee);
    })
  }

  renderEmployee(employee) {
    const employeeTemplate = new Option(employee, this.list, this.select, {
      searchEmployees: this.searchEmployees.bind(this)
    });
    employeeTemplate.render();
    this.templates.employees.push(employeeTemplate);
  }

  removeEmployees() {
    this.templates.employees.forEach(emploeeTemplate => {
      emploeeTemplate.remove();
    });

    this.templates.employees = [];
  }

  updatePosition() {
    this.style = {
      "width" : `${$(this.select).outerWidth()}px`,
      "top"   : `${$(this.select).offset().top + $(this.select).height()}px`,
      "left"  : `${$(this.select).offset().left}px`
    }
    this.template.css(this.style);
  }

  render() {
    this.parent.append(this.template);
    this.select.addClass('input--hasFocus');
    this.input.focus();
  }
  
  remove() {
    this.template.remove();
    this.removeListeners();
    this.select.removeClass('input--hasFocus');
  }
}


module.exports = Options;