'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Projects', [
{description:"They might not call themselves a bank, but we both know that our organization cannot continue to exist alongside IMF",name:"Make life miserable for the IMF"},
{description:"there's only",name:"Revisit peace agreements"}
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Projects', null, {});
  }
};
