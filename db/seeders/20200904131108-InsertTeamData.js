'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Teams', [
{organizationId: 1,description:"marketing solutions at the world bank", name:"Marketing"},
{organizationId: 1,description:"HR staff and support personnel at the world bank", name:"Human Resources"},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Teams', null, {});
  }
};
