"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("types", [
      {
        name: "Вино",
      },
      {
        name: "Виски",
      },
      {
        name: "Водка",
      },
      {
        name: "Джин",
      },
      {
        name: "Коньяк",
      },
      {
        name: "Ликер",
      },
      {
        name: "Пиво",
      },
    ])
  },
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("types", null, {}),
}
