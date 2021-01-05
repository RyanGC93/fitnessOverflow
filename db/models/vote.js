'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER,
    voteType: DataTypes.STRING
  }, {});
  Vote.associate = function(models) {
    Votes.belongsTo(models.User, {
      foreignKey: "userId"
    })
    Votes.belongsTo(models.Answer, {
      foreignKey: "answerId"
    } )    
  };
  return Vote;
};