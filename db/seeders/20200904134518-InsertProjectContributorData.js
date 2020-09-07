'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('ProjectContributors', [
{projectId:1,userId:1},
{projectId:1,userId:2},
{projectId:2,teamId:1},
{projectId:1,userId:3}
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('ProjectContributors', null, {});
  }
};
