'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'admin',
      email: 'admin',
      username: 'admin',
      password: '$2a$08$sw7JnaJKa9MBgxF7qiOxDe7XsUQZ5WK7RXbfsPMAO/zonUF1yxNxu',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'teste',
      email: 'teste',
      username: 'teste',
      password: '$2a$08$VIQ3FxNZe6MQlMzihDWcuO6xONx4oLYayUbVV9mM8j/q9ceIm7O1W',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
