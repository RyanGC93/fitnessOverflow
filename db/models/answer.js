'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    body: DataTypes.STRING,
    questionId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.User, {
      foreignKey: "authorId"
    })
    Answer.belongsTo(models.Question, {
      foreignKey: "questionId"
    })
    Answer.hasMany(models.Vote, {
      foreignKey: "answerId",
      onDelete: 'cascade',
      hooks: true,
    })
  };
  return Answer;
};
