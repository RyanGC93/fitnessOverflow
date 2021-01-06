'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users = [{
      username: 'DemoUser',
      email: 'demoUser@demo.com',
      hashedPassword: await bcrypt.hash(`DemoPass123!`,10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }]

    for (let i = 0; i < 45; i++) {
      let newUser = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        hashedPassword: await bcrypt.hash(`password${i}`, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(newUser)
    }

    return queryInterface.bulkInsert('Users',users, {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});
  }
};

