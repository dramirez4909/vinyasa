'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.INTEGER,
    assigneeId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    priority: DataTypes.STRING,
    status: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    parentTaskId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.User, {foreignKey:"authorId"});
    Task.belongsTo(models.User,{foreignKey:"assigneeId"});
    Task.belongsTo(models.Project,{foreignKey:"projectId"});
    Task.hasMany(models.Task,{foreignKey: "parentTaskId"})
    const columnMapping = {
      through:"TagLink",
      otherKey:"tagId",
      foreignKey:"linkedTaskId"
    }
    Task.belongsToMany(models.Tag,columnMapping)
    Task.belongsTo(models.Team, { foreignKey: "teamId" })
  };
  return Task;
};