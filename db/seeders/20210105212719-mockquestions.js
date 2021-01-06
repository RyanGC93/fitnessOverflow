
'use strict';
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let questions = [{

      title: 'How often should I workout?',
      body: "Hello I was wondering how often I should workout to make sure im healthy?",
      // The American College of Sports Medicine (ACSM) recommends getting 150 minutes of moderate intensity physical activity per week to achieve the health benefits, maintain current weight, and/or prevent weight gain.
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
   },
   {

      title: "Should Children Lift Weights?",
     body: "I have a kid and I was wondering if they can get gains too",
      // 
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
   },
   {

      title: "How To Lose a Pound",
      body: "I am always working out but seem to not be able to lose any weight. My question is how much effort does it take to lose a pound?",

      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
   }, 
      {
        title: "How to get bigger muscles",
        body: "I have never been much of an athlete and I was wonder how I can get bigger muscles ?",

        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      } 
   
   ]
  
  

    
    for (let i = 1; i < 45; i++) {
      let authorId = i
      let newQuestions = {
        title: faker.lorem.words(3),
        body: faker.lorem.words(25),
        authorId: authorId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      questions.push(newQuestions)
    }

    return queryInterface.bulkInsert('Questions',questions, {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Questions', null, {});
  }
};
