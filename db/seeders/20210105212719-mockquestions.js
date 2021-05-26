
'use strict';
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let questions = [{

      title: 'How often should I workout?',
      body: "Hello I was wondering how often I should workout to make sure im healthy?",
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
      },

      // ! New Questions
      {
        title: "How much Cardio?",
        body: "I am getting into fitness and I was wondering how much cardio should i do ",

        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Best Cardio Equipment",
        body: "When doing cardio what is the best equipment bike, elliptical or treadmill?",

        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Best way to get rid of belly fat",
        body: "I have a gut and I was wondering what the best way to lose belly fat is",

        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "How to lose back fat?",
        body: "What is the best way to lose back fat?",

        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Weight Lose Plateau",
        body: "Why am I plateauing my results after losing 20 lbs ",

        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Morning Workout",
        body: "Best morning workout that give you energy for the rest of the day",

        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "How to build endurance",
        body: "Whats the best way to build endurance",

        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Tips for fitness resistant people",
        body: "What's your best tip for people who are having a hard time committing?",

        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Personal Trainer Alternatives",
        body: "What are some good workout options if you can't afford a personal trainer",

        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Rests Between Workouts",
        body: "How long should people rest in between workouts?",

        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Disclosing Medication",
        body: "Should a personal trainer know all of the medications someone is on?",

        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "How Important Is Nutrition",
        body: "How important is nutrition if someone works out consistently?",

        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Should I Work Out Under Stress?",
        body: "If Im stressed out should I workout",

        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Obesity and Lifting, is it Safe",
        body: "I am obese. Is it safe for me to workout?",

        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Will weights make women bulky?",
        body: "Should women lift weights if they don't want to get bulky looking?",

        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Why do some people lose weight faster?",
        body: "Is it true that some people naturally lose weight faster than others?",

        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
   
   ]

    return queryInterface.bulkInsert('Questions',questions, {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Questions', null, {});
  }
};
