'use strict';
module.exports = (sequelize, DataTypes) => {
  const TeamMember = sequelize.define('TeamMember', {
    userId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER
  }, {});
  TeamMember.associate = function(models) {
  };
  return TeamMember;
};