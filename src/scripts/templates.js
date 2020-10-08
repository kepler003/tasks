
const errorTemplate = (error) => {
  return `
    <span class="input__error">${error}</span>
  `;
}

const optionsTemplate = () => {
  return `
    <div class="select__box">
      <div class="select__header">
        <div class="input__box input__box--no-margin">
          <input class="input--search input--gray" placeholder="Szukaj">
          <i class="fas fa-search input__icon"></i>
        </div>
      </div>
      <ul class="select__list">
      </ul>
    </div>
  `;
}

const optionTemplate = () => {
  return `
    <li class="select__list-item"></li>
  `;
}

const userCard = ({
  name = 'Anonymous',
  src,
  isChecked = false
}) => {
  return `
    <div class="user-card user-card--isChosen">
      <img src="${src}" alt="User avatar" class="user-card__avatar">
      <p class="user-card__name">${name}</p>
      ${isChecked ? '<i class="fas fa-check user-card__icon"></i>' : ''}
    </div>
  `;
}

const tasksRowTemplate = ({
  task = 'Not named',
  price = '???'
}) => {

  const priceEUR = price != '???' ? Math.round(price / 4.8282 * 100) / 100 : '???';

  return `
    <tr class="tasks__row">
      <th scope="row" class="tasks__th tasks__cell">${task}</th>
      <td class="tasks__cell">${price} PLN</td>
      <td class="tasks__cell">${priceEUR} EUR</td>
      <td class="tasks__cell">
        <button class="tasks__button button--transparent">
          <i class="fas fa-trash button__icon button__icon--left"></i> Usuń
        </button>
      </td>
    </tr>
  `;
}

const tasksRowEmptyTemplate = () => {
  return `
    <tr class="tasks__row">
      <td class="tasks__cell tasks__cell--no-border">Brak zadań</td>
    </tr>
  `;
}

module.exports = {
  errorTemplate,
  optionsTemplate,
  optionTemplate,
  userCard,
  tasksRowTemplate,
  tasksRowEmptyTemplate
}