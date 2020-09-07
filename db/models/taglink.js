'use strict';
module.exports = (sequelize, DataTypes) => {
  const TagLink = sequelize.define('TagLink', {
    linkedObjectType: DataTypes.STRING,
    tagId: DataTypes.INTEGER,
    linkedTaskId: DataTypes.INTEGER,
    linkedProjectId: DataTypes.INTEGER
  }, {});
  TagLink.associate = function(models) {
    // associations can be defined here
  };
  return TagLink;
};