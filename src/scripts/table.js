
const $ = require('jquery');
const {
  getChosenEmployee,
  removeTask,
  subscribeToChosenEmployee,
  unsubscribeFromChosenEmployee
} = require('./storage');


class Table {
  constructor(parent) {
    this.parent       = parent;
    this.employee     = getChosenEmployee();
    this.template     = $(this.getTemplate());
    this.templateBody = this.template.find('.js-tasks__table-body');
    this.sortType     = undefined;
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
                  <button 
                    class="tasks__th-button button--no-style js-task__th-button--sort"
                    data-sort="from z"
                  >
                    <span class="button__icon--triangle-up"></span>
                  </button>
                  <button 
                    class="tasks__th-button button--no-style js-task__th-button--sort"
                    data-sort="from a"
                  >
                    <span class="button__icon--triangle-down"></span>
                  </button>
                </div>
              </div>
            </th>
            <th scope="col" class="tasks__th tasks__cell">
              <div class="tasks__cell-box">
                <span>Kwota w PLN</span>
                <div class="tasks__th-buttons">
                  <button
                    class="tasks__th-button button--no-style js-task__th-button--sort"
                    data-sort="pln from lowest"
                  >
                    <span class="button__icon--triangle-up"></span>
                  </button>
                  <button
                    class="tasks__th-button button--no-style js-task__th-button--sort"
                    data-sort="pln from highest"
                  >
                    <span class="button__icon--triangle-down"></span>
                  </buttonclass=>
                </div>
              </div>
            </th>
            <th scope="col" class="tasks__th tasks__cell">
              <div class="tasks__cell-box">
                <span>Kwota w EUR</span>
                <div class="tasks__th-buttons">
                  <button
                    class="tasks__th-button button--no-style js-task__th-button--sort"
                    data-sort="eur from lowest"
                  >
                    <span class="button__icon--triangle-up"></span>
                  </button>
                  <button
                    class="tasks__th-button button--no-style js-task__th-button--sort"
                    data-sort="eur from highest"
                  >
                    <span class="button__icon--triangle-down"></span>
                  </buttonclass=>
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
    $(document).on('click.task-remove', '.js-tasks__button--remove', (e) => {
      if($(this.templateBody).has(e.target).length === 0) return;

      this.deleteTask($(e.target).data('index'));
    })

    $(document).on('click.task-sort', '.js-task__th-button--sort', (e) => {
      if($(this.template).has(e.target).length === 0) return;

      this.setTaskSorting($(e.target).data('sort'));
    })
  }

  removeListeners() {
    $(document).off('click.task-remove');
    $(document).off('click.task-sort');
  }

  subscribeToChosenEmployee() {
    subscribeToChosenEmployee(this);
  }

  unsubscribeFromChosenEmployee() {
    unsubscribeFromChosenEmployee(this);
  }

  chosenEmployeeChanged() {
    this.updateEmployee();
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

  setTaskSorting(sort) {
    this.sortType = sort;
    this.sortTasks();
    this.updateBody();
  }

  sortTasks() {

    switch(this.sortType) {
      case 'from a': {
        this.employee.tasks = this.employee.tasks.sort((taskA, taskB) => {
          const nameA = taskA.name.toLowerCase();
          const nameB = taskB.name.toLowerCase();
          if(nameA < nameB) return -1;
          if(nameA > nameB) return 1;
          return 0;
        });
        break;
      }
      case 'from z': {
        this.employee.tasks = (this.employee.tasks.sort((taskA, taskB) => {
          const nameA = taskA.name.toLowerCase();
          const nameB = taskB.name.toLowerCase();
          if(nameA < nameB) return -1;
          if(nameA > nameB) return 1;
          return 0;
        })).reverse();
        break;
      }
      case 'pln from lowest': {
        this.employee.tasks = this.employee.tasks.sort((taskA, taskB) => {
          const priceA = taskA.pricePLN;
          const priceB = taskB.pricePLN;
          if(priceA < priceB) return -1;
          if(priceA > priceB) return 1;
          return 0;
        });
        break;
      }
      case 'pln from highest': {
        this.employee.tasks = (this.employee.tasks.sort((taskA, taskB) => {
          const priceA = taskA.pricePLN;
          const priceB = taskB.pricePLN;
          if(priceA < priceB) return -1;
          if(priceA > priceB) return 1;
          return 0;
        })).reverse();
        break;
      }
      case 'eur from lowest': {
        this.employee.tasks = this.employee.tasks.sort((taskA, taskB) => {
          const priceA = taskA.pricePLN;
          const priceB = taskB.pricePLN;
          if(priceA < priceB) return -1;
          if(priceA > priceB) return 1;
          return 0;
        });
        break;
      }
      case 'eur from highest': {
        this.employee.tasks = (this.employee.tasks.sort((taskA, taskB) => {
          const priceA = taskA.priceEUR;
          const priceB = taskB.priceEUR;
          if(priceA < priceB) return -1;
          if(priceA > priceB) return 1;
          return 0;
        })).reverse();
        break;
      }
    }
  }

  render() {
    this.parent.append(this.template);
    this.updateEmployee();
    this.addListeners();
    this.subscribeToChosenEmployee();
  }
  
  remove() {
    this.template.remove();
    this.removeListeners();
    this.unsubscribeFromChosenEmployee();
  }
}


module.exports = Table;