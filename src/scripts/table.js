
const $ = require('jquery');
const {getChosenEmployee, setChosenEmployee, removeTask} = require('./storage');
// const {makeHasValue}      = require('./input');


class Table {
  constructor(parent) {
    this.parent = parent;
    this.employee = getChosenEmployee();
    this.template = $(this.getTemplate());
    this.templateBody = this.template.find('.js-tasks__table-body');
  }

  getTemplate() {
    return `
      <table class="tasks__table">

        <thead>
          <tr class="tasks__row">
            <th scope="col" class="tasks__th tasks__cell">
              <div class="tasks__cell-box">
                <span>Nazwa zadania</span>
                <div class="tasks__th-buttons">
                  <button class="tasks__th-button button--no-style">
                    <span class="button__icon--triangle-up"></span>
                  </button>
                  <button class="tasks__th-button button--no-style">
                    <span class="button__icon--triangle-down"></span>
                  </button>
                </div>
              </div>
            </th>
            <th scope="col" class="tasks__th tasks__cell">
              <div class="tasks__cell-box">
                <span>Kwota w PLN</span>
                <div class="tasks__th-buttons">
                  <button class="tasks__th-button button--no-style">
                    <span class="button__icon--triangle-up"></span>
                  </button>
                  <button class="tasks__th-button button--no-style">
                    <span class="button__icon--triangle-down"></span>
                  </button>
                </div>
              </div>
            </th>
            <th scope="col" class="tasks__th tasks__cell">
              <div class="tasks__cell-box">
                <span>Kwota w EUR</span>
                <div class="tasks__th-buttons">
                  <button class="tasks__th-button button--no-style">
                    <span class="button__icon--triangle-up"></span>
                  </button>
                  <button class="tasks__th-button button--no-style">
                    <span class="button__icon--triangle-down"></span>
                  </button>
                </div>
              </div>
            </th>
            <th scope="col" class="tasks__th tasks__cell">
              <div class="tasks__cell-box tasks__cell-box--center">
                <span>Opcje</span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody class="tasks__table-body js-tasks__table-body">
          ${this.getEmptyRowTemplate()}
        </tbody>

      </table>
    `;
  }

  getRowTemplate(task) {
    return `
      <tr class="tasks__row">
        <th scope="row" class="tasks__th tasks__cell">${task.name}</th>
        <td class="tasks__cell">${task.pricePLN} PLN</td>
        <td class="tasks__cell">${task.priceEUR} EUR</td>
        <td class="tasks__cell">
          <button 
            class="tasks__button button--transparent js-tasks__button--remove" 
            data-index="${task.id}"
          >
            <i class="fas fa-trash button__icon button__icon--left"></i> Usuń
          </button>
        </td>
      </tr>
    `;
  }

  getEmptyRowTemplate() {
    return `
      <tr class="tasks__row">
        <td class="tasks__cell tasks__cell--no-border">Brak zadań</td>
      </tr>
    `;
  }

  addListeners() {
    $(document).on('click.task', '.js-tasks__button--remove', (e) => {
      if($(this.templateBody).has(e.target).length === 0) return;

      this.deleteTask($(e.target).data('index'));
    })
  }

  removeListeners() {
    $(document).off('click.task');
  }

  updateEmployee() {
    this.employee = getChosenEmployee();
    this.updateBody();
  }

  updateBody() {
    this.templateBody.empty();

    if(!this.employee) {
      this.templateBody.append(this.getEmptyRowTemplate());
    } else {
      
      if(!this.employee.tasks.length) {
        this.templateBody.append(this.getEmptyRowTemplate());
      } else {

        this.employee.tasks.forEach(task => {
          this.templateBody.append(this.getRowTemplate(task));
        });
      }
    }
  }

  deleteTask(taskId) {
    removeTask(this.employee.id, taskId);
    this.updateEmployee();
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


module.exports = Table;