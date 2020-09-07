'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectContributor = sequelize.define('ProjectContributor', {
    teamId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  ProjectContributor.associate = function(models) {
    // associations can be defined here
  };
  return ProjectContributor;
};