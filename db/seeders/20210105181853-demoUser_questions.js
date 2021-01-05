'use strict';

module.exports = {
  up: asy(queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */      
      return queryInterface.bulkInsert('Questions', [
		{ "title ","body",  1}
      ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */      
      return queryInterface.bulkDelete('Questions', null, {
      });
  }
};
