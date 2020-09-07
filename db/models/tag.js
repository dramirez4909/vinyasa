'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    color: DataTypes.STRING,
    organizationId: DataTypes.INTEGER
  }, {});
  Tag.associate = function(models) {
    Tag.belongsTo(models.Organization, { foreignKey: "organizationId" })
    const columnMapping = {
      through: "TagLink",
      otherKey: "linkedTaskId",
      foreignKey: "tagId"
    }
    Tag.belongsToMany(models.Task, columnMapping)
    const moreColumnMapping = {
      through: "TagLink",
      otherKey: "linkedProjectId",
      foreignKey: "tagId"
    }
    Tag.belongsToMany(models.Project, moreColumnMapping)
  };
  return Tag;
};