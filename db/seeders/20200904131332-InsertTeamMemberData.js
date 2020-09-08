'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('TeamMembers', [
{userId:1,teamId:1},
{userId:2,teamId:1},
{userId:3,teamId:1},
{userId:1,teamId:2},
{ userId: 4, teamId: 2 },
        { userId: 5, teamId: 2 },
        { userId: 6, teamId: 2 },
        { userId: 8, teamId: 2 },
        { userId: 7, teamId: 2 },
        { userId: 9, teamId: 2 },
        { userId: 5, teamId: 1 },
        { userId: 6, teamId: 1 },
        { userId: 8, teamId: 1 },
        { userId: 11, teamId: 2 },
        { userId: 11, teamId: 1 },
        { userId: 10, teamId: 2 },
        { userId: 10, teamId: 1 },

      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('TeamMembers', null, {});

  }
};
