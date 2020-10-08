
const $ = require('jquery');

class Options {
  constructor(select) {
    this.select    = $(select);
    this.parent    = $('body');
    this.employees = undefined;
    this.config    = {
      "width" : `${$(select).outerWidth()}px`,
      "top"   : `${$(select).offset().top + $(select).height()}px`,
      "left"  : `${$(select).offset().left}px`
    }
    this.template  = $(this.getTemplate()).css(this.config);
    this.listeners = this.setUpListeners();
  }

  getTemplate() {
    return `
      <div class="select__box">
        <div class="select__header">
          <div class="input__box input__box--no-margin">
            <input
              class="input--search input--gray"
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
    return {
      clickOutside: $(document).on('mouseup.options', (e) => {
        if(!this.template.is(e.target) && this.template.has(e.target).length === 0) {
          this.remove();
        }
      })
    }
  }

  removeListeners() {
    $(document).off('mouseup.options');
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