
let storage = {
  employees: [
    {
      id: 0,
      name: 'Adam Nowak',
      src: './images/man1',
      tasks: [
        {
          id: 1,
          name: 'Zadanie 1',
          pricePLN: 2121,
          priceEUR: 122
        },
        {
          id: 2,
          name: 'Zadanie 2',
          pricePLN: 2121,
          priceEUR: 122
        },
        {
          id: 3,
          name: 'Zadanie 3',
          pricePLN: 2121,
          priceEUR: 122
        }
      ]
    },
    {
      id: 1,
      name: 'Michał Potoczek',
      src: './images/man2',
      tasks: [
        {
          id: 1,
          name: 'Zadanie 1',
          pricePLN: 2121,
          priceEUR: 122
        }
      ]
    },
    {
      id: 2,
      name: 'Antoni Worek',
      src: './images/man3',
      tasks: [
        {
          id: 1,
          name: 'Zadanie 1',
          pricePLN: 2121,
          priceEUR: 122
        },
        {
          id: 2,
          name: 'Zadanie 2',
          pricePLN: 2121,
          priceEUR: 122
        }
      ]
    }
  ],
  chosenEmployee: undefined,
  chosenEmployeeSubscribers: []

}


const searchByName = (name) => {
  const employees = storage.employees.filter(employee => {
    return employee.name.toLowerCase().includes(name.toLowerCase());
  });

  return employees.map(employee => ({
    ...employee,
    isChosen: storage.chosenEmployee === employee.id
  }))
}

const setChosenEmployee = (id) => {
  storage.chosenEmployee = id;

  storage.chosenEmployeeSubscribers.forEach(subscriber => {
    subscriber.chosenEmployeeChanged();
  });
}

const getChosenEmployee = () => {
  return storage.employees.find(employee => employee.id === storage.chosenEmployee);
}

const removeTask = (employeeId, taskId) => {
  storage.employees[employeeId].tasks = storage.employees[employeeId].tasks.filter(task => {
    return task.id.toString() != taskId.toString();
  })
}

const subscribeToChosenEmployee = (subscriber) => {
  storage.chosenEmployeeSubscribers.push(subscriber);
}

const unsubscribeFromChosenEmployee = (subscriberToRemove) => {
  storage.chosenEmployeeSubscribers = storage.chosenEmployeeSubscribers.filter(subscriber => {
    return !Object.is(subscriber, subscriberToRemove);
  });
}


module.exports = {
  searchByName,
  setChosenEmployee,
  getChosenEmployee,
  removeTask,
  subscribeToChosenEmployee,
  unsubscribeFromChosenEmployee
}