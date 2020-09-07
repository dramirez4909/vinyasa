'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Tasks', [
{name:"get some veggies",projectId:1,assigneeId:1,authorId:2,description:"walk the dog",priority:"low",status:"new",createdAt:new Date(),updatedAt:new Date()},      
{name:"make the moola",projectId:1,assigneeId:1,authorId:2,description:"walk the dog",priority:"low",status:"new",createdAt:new Date(),updatedAt:new Date()},
{name:"Eat a bagel",projectId:1,assigneeId:1,authorId:2,description:"walk the dog",priority:"low",status:"new",createdAt:new Date(),updatedAt:new Date()},
{name:"approve memos",projectId:1,assigneeId:1,authorId:2,description:"walk the dog",priority:"low",status:"new",createdAt:new Date(),updatedAt:new Date()},
{name:"talk to corporate",projectId:2,assigneeId:1,authorId:2,description:"walk the dog",priority:"low",status:"new",createdAt:new Date(),updatedAt:new Date()},
{name:"lead workshop",projectId:2,assigneeId:1,authorId:2,description:"walk the dog",priority:"low",status:"new",createdAt:new Date(),updatedAt:new Date()},
{name:"send some faxes",projectId:2,assigneeId:1,authorId:2,description:"walk the dog",priority:"low",status:"new",createdAt:new Date(),updatedAt:new Date()},
{name:"direct workflow",projectId:2,assigneeId:1,authorId:2,description:"walk the dog",priority:"low",status:"new",createdAt:new Date(),updatedAt:new Date()},        
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Tasks', null, {});
  }
};
