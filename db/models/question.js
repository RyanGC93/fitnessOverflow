'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    authorId: DataTypes.INTEGER
  }, {});
  Question.associate = function(models) {
    Question.belongsTo(models.User, {
      foreignKey: "authorId"
    } )
    Question.hasMany(models.Answer, {
      foreignKey: "questionId",
      onDelete: 'cascade',
      hooks: true,
    } )
  };
  return Question;
};