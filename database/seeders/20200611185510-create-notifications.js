'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notifications', [{
      title: 'Notificacao chumbada',
      description: 'Descrição chumbada',
      viewed: false,
      type:'prova',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Só mais um exemplo',
      description: 'Outra notificação chumbada',
      viewed: false,
      type:'atividade',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notifications', null, {});
  }
};
