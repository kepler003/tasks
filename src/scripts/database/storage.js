
let storage = {
  employees: [
    {
      id: 0,
      name: 'Adam Nowak',
      src: './images/man1.jpg',
      tasks: [
        {
          id: 1,
          name: 'Zadanie C',
          pricePLN: 2121,
          priceEUR: 439.29
        },
        {
          id: 2,
          name: 'Zadanie D',
          pricePLN: 2512,
          priceEUR: 520.27
        },
        {
          id: 3,
          name: 'Zadanie A',
          pricePLN: 6543,
          priceEUR: 1355.16
        }
      ]
    },
    {
      id: 1,
      name: 'Michał Potoczek',
      src: './images/man2.jpg',
      tasks: [
        {
          id: 1,
          name: 'Zadanie 1',
          pricePLN: 1000,
          priceEUR: 207.12
        }
      ]
    },
    {
      id: 2,
      name: 'Antoni Worek',
      src: './images/man3.jpg',
      tasks: [
        {
          id: 1,
          name: 'Zadanie 1',
          pricePLN: 1255,
          priceEUR: 259.93
        },
        {
          id: 2,
          name: 'Zadanie 2',
          pricePLN: 60,
          priceEUR: 12.43
        }
      ]
    }
  ],
  chosenEmployee: undefined,
  subscribers: []
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
  updateSubscribers();
}

const getChosenEmployee = () => {
  return storage.employees.find(employee => employee.id === storage.chosenEmployee);
}

const addTask = (task) => {
  storage.employees = storage.employees.map(employee => {
    if(employee.id !== storage.chosenEmployee) return employee;

    return ({
      ...employee,
      tasks: [...employee.tasks, {
        id: employee.tasks[employee.tasks.length - 1] ? employee.tasks[employee.tasks.length - 1].id + 1 : 1,
        name: task.name,
        pricePLN: task.price,
        priceEUR: Math.round(task.price / 4.8282 * 100) / 100
      }]
    })
  });

  updateSubscribers();
}

const removeTask = (taskId) => {
  storage.employees = storage.employees.map(employee => {
    if(employee.id !== storage.chosenEmployee) return employee;

    return {
      ...employee,
      tasks: employee.tasks.filter(task => task.id.toString() != taskId.toString())
    }
  })
}

const subscribe = (subscriber) => {
  storage.subscribers.push(subscriber);
}

const unsubscribe = (subscriberToRemove) => {
  storage.subscribers = storage.subscribers.filter(subscriber => {
    return !Object.is(subscriber, subscriberToRemove);
  });
}

const updateSubscribers = () => {
  storage.subscribers.forEach(subscriber => {
    subscriber.storageUpdate();
  });
}


module.exports = {
  searchByName,
  setChosenEmployee,
  getChosenEmployee,
  addTask,
  removeTask,
  subscribe,
  unsubscribe
}