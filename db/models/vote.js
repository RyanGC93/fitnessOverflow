'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER,
    voteType: DataTypes.STRING
  }, {});
  Vote.associate = function(models) {
    Vote.belongsTo(models.User, {
      foreignKey: "userId"
    })
<<<<<<< HEAD
    Vote.belongsTo(models.Answer, {
=======
  Vote.belongsTo(models.Answer, {
>>>>>>> main
      foreignKey: "answerId"
    } )
  };
  return Vote;
};
