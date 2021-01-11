

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Question, {
      foreignKey: "authorId"
    })
    User.hasMany(models.Answer, {
      foreignKey: "authorId"
    })
    User.hasMany(models.Vote, {
      foreignKey: "userId",
      onDelete: 'cascade',
      hooks: true,
    })
  };
  return User;
};
