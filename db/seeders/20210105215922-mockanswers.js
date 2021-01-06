
'use strict';
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let answers = [{

      body: "The American College of Sports Medicine (ACSM) recommends getting 150 minutes of moderate intensity physical activity per week to achieve the health benefits, maintain current weight, and/or prevent weight gain.",
      questionId: 1,
      authorId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
   },
   {

     body: "Kids lift weight all the time, and more than most adults. Think about how often a kid climbs up a tree or jungle gym. They are lifting their entire body weight. When they piggy back one another, they carry a friends' entire body weight on their back whilst running.",
      questionId: 2,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
   },
   {


     body: "It takes 3,500 calories to gain or lose one pound. To lose one pound per week, you need to decrease your calories by 500 every day. This is usually done by cutting 250 calories out of your diet and burning the other 250 through activity.",
      questionId: 3,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
   },
   {


     body: "Whether or not your clients will get bigger muscles (hypertrophy) depends on three basic factors: genetics, gender and training intensity. Genetics is mostly manifested as muscle fiber type; people with predominantly fast-twitch fibers acquire larger muscles more easily than people with predominantly slow-twitch fibers. In relation to gender, males acquire larger muscles than females do, because males have greater amounts of testosterone and other sex hormones that influence protein metabolism (Tipton 2001). Thus, females experience less muscle hypertrophy with strength improvement than males do (Lewis et al. 1986). Training intensity is the only factor you can control.",
     questionId: 4,
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
