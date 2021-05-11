
'use strict';


function randomNum() { // min and max included 
  let min = 2
  let max = 20
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
        answerId: randomNum(),
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
