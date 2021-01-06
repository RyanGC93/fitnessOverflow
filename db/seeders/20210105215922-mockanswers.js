
'use strict';
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let answers = [{

      body: "The American College of Sports Medicine (ACSM) recommends getting 150 minutes of moderate intensity physical activity per week to achieve the health benefits, maintain current weight, and/or prevent weight gain.",
      questionId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
   },
   {

     body: "The American College of Sports Medicine (ACSM) recommends getting 150 minutes of moderate intensity physical activity per week to achieve the health benefits, maintain current weight, and/or prevent weight gain.",
      questionId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
   },
   {


     body: "Kids lift weight all the time, and more than most adults. Think about how often a kid climbs up a tree or jungle gym. They are lifting their entire body weight. When they piggy back one another, they carry a friends' entire body weight on their back whilst running.",
      questionId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
   },
   {


     body: "How important is nutrition if someone works out consistently You can't out train a bad diet.",
     questionId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
   }]

    for (let i = 1; i < 45; i++) {
      let authorId = i
      let newAnswers = {
        body: faker.lorem.words(30),
        questionId: authorId,
        authorId: authorId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      answers.push(newAnswers)
    }

    return queryInterface.bulkInsert('Answers',answers, {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Answers', null, {});
  }
};
