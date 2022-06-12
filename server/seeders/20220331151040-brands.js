"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("brands", [
      {
        name: "Jameson",
      },
      {
        name: "Jack Daniels",
      },
      {
        name: "Antinori",
      },
    ])
  },
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("brands", null, {}),
}
