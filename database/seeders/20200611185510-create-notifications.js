'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notifications', [{
      title: 'Outra do admin',
      description: 'Olloooquinho meu',
      viewed: true,
      type:'prova',
      id_user: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      title: 'Tarefa do admin',
      description: 'descrição da tarefa',
      viewed: false,
      type:'prova',
      id_user: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Terceira tarefa',
      description: 'Silvio Santos vem aí',
      viewed: false,
      type:'atividade',
      id_user: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Tarefa do teste',
      description: 'Ta pegando fogo bixo',
      viewed: false,
      type:'prova',
      id_user: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Háááá yeah yeah',
      description: 'Porta dos desesperados',
      viewed: false,
      type:'prova',
      id_user: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notifications', null, {});
  }
};
