'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('TeamMembers', [
{userId:1,teamId:1},
{userId:2,teamId:1},
{userId:3,teamId:1},
{userId:1,teamId:2},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('TeamMembers', null, {});

  }
};
