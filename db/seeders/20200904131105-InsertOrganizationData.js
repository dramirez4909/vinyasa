'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Organizations', [
        {name:"The World Bank",description:"Saving the world from itself one dollar at a time"}
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Organziations', null, {});
  }
};
