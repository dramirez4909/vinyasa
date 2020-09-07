'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Project.associate = function(models) {
    Project.hasMany(models.Task,{foreignKey:"projectId"});
    const columnMapping = {
      through: "ProjectContributor",
      otherKey: "userId",
      foreignKey: "projectId"
    }
    Project.belongsToMany(models.User, columnMapping)
    const moreColumnMapping = {
      through: "ProjectContributor",
      otherKey: "teamId",
      foreignKey: "projectId"
    }
    Project.belongsToMany(models.Team, moreColumnMapping)
    const evenMoreColumnMapping = {
      through: "TagLink",
      otherKey: "tagId",
      foreignKey: "linkedProjectId"
    }
    Project.belongsToMany(models.Tag, evenMoreColumnMapping)
  };
  return Project;
};