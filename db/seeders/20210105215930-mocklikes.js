
'use strict';
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let votes = [{

      userId: 1,
      answerId: 3,
      voteType: "upvote",
      createdAt: new Date(),
      updatedAt: new Date(),
   },
    ]
    
    let voteTypes=['upvote', 'downvote'] 

    for (let i = 3; i < 45; i++) {
      let vote= i
      let newVotes = {
        userId: vote,
        answerId: vote,
        voteType:  voteTypes[Math.floor(Math.random() * 2)],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      votes.push(newVotes)
    }

    return queryInterface.bulkInsert('Votes',votes, {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Votes', null, {});
  }
};
