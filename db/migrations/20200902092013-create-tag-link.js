'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TagLinks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      linkedObjectType: {
        type: Sequelize.STRING
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {model: "Tags"}
      },
      linkedTaskId: {
        type: Sequelize.INTEGER,
        references: { model: "Tasks" }
      },
      linkedProjectId: {
        type: Sequelize.INTEGER,
        references: { model: "Projects" }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TagLinks');
  }
};