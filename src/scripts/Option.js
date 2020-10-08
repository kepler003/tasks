
const $ = require('jquery');
const {setChosenEmployee} = require('./storage');


class Option {
  constructor(user, parent) {
    this.id       = user.id;
    this.name     = user.name;
    this.src      = user.src;
    this.isChosen = user.isChosen;
    this.parent   = $(parent);
    this.template = $(this.getTemplate());
    this.userCard = this.template.find('.user-card');
  }

  getTemplate() {
    return `
      <li class="select__list-item">
        <div class="user-card ${this.isChosen ? 'user-card--isChosen' : ''}">
          <img src="${this.src}" alt="User avatar" class="user-card__avatar">
          <p class="user-card__name">${this.name}</p>
          ${this.isChosen ? '<i class="fas fa-check user-card__icon"></i>' : ''}
        </div>
      </li>
    `;
  }

  addListeners() {
    $(this.userCard).on('click', () => {
      this.chooseEmployee();
    });
  }

  removeListeners() {
    $(this.userCard).off('click');
  }

  chooseEmployee() {
    setChosenEmployee(this.id);
  }

  render() {
    this.parent.append(this.template);
    this.addListeners();
  }
  
  remove() {
    this.template.remove();
    this.removeListeners();
  }
}


module.exports = Option;