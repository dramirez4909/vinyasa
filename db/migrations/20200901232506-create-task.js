'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      assigneeId: {
        type: Sequelize.INTEGER,
        references: {model: "Users"}
      },
      authorId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: { model: "Users" }
      },
      description: {
        type: Sequelize.TEXT
      },
      priority: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      teamId: {
        type: Sequelize.INTEGER,
        references: {model: "Teams"}
      },
      dueDate: {
        type: Sequelize.DATE
      },
      parentTaskId: {
        type: Sequelize.INTEGER
      },
      projectId: {
        type: Sequelize.INTEGER,
        references: { model: "Projects" }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};