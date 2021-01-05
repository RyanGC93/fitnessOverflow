'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER,
    voteType: DataTypes.STRING
  }, {});
  Vote.associate = function(models) {
    // associations can be defined here
  };
  return Vote;
};