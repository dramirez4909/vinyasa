'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Organization.associate = function(models) {
    Organization.hasMany(models.Team, { foreignKey: "organizationId" })
    Organization.hasMany(models.Tag, { foreignKey: "organizationId" })
  };
  return Organization;
};