'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    organizationId: DataTypes.INTEGER
  }, {});
  Team.associate = function(models) {
    Team.belongsTo(models.Organization,{foreignKey:"organizationId"})
    const columnMapping = {
      through: "TeamMember",
      otherKey: "userId",
      foreignKey: "teamId"
    }
    Team.belongsToMany(models.User,columnMapping)
    const moreColumnMapping = {
      through: "ProjectContributor",
      otherKey: "projectId",
      foreignKey: "teamId"
    }
    Team.belongsToMany(models.Project,moreColumnMapping)
    Team.hasMany(models.Task,{foreignKey:"teamId"})
  };
  return Team;
};