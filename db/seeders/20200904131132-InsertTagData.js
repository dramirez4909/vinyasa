'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Tags', [
{name:"5mins",description:"quick task, just do it!",color:"blue",organizationId:1},
{name:"IMF related",description:"Task related to the IMF",color:"yellow",organizationId:1},
{name:"HR",description:"Human Resources related task.",color:"grey",organizationId:1},        
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Tags', null, {});
  }
};
