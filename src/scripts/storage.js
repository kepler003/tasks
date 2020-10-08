
let storage = {
  employees: [
    {
      id: 0,
      name: 'Adam Nowak',
      src: './images/man1',
      tasks: [
        {
          name: 'Zadanie 1',
          pricePLN: 2121,
          priceEUR: 122
        },
        {
          name: 'Zadanie 2',
          pricePLN: 2121,
          priceEUR: 122
        },
        {
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
          name: 'Zadanie 1',
          pricePLN: 2121,
          priceEUR: 122
        },
        {
          name: 'Zadanie 2',
          pricePLN: 2121,
          priceEUR: 122
        }
      ]
    }
  ],
  chosenEmployee: undefined
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
}


module.exports = {
  searchByName,
  setChosenEmployee
}