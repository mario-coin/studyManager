'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE
      },
      deadline: {
        type: Sequelize.DATE
      },
      complexity: {
        type: Sequelize.ENUM('facil','mediano','dificil')
      },
      duration: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM('prova', 'trabalho', 'atividade')
      },
      situation: {
        type: Sequelize.ENUM('pendente', 'desenvolvendo', 'concluido'),
        defaultValue: 'pendente'
      },
      dependency: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tasks');
  }
};