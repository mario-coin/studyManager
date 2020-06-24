'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notifications', [{
      title: 'Outra do admin',
      description: 'Olloooquinho meu',
      viewed: true,
      type:'prova',
      id_user: 1,
      id_task: 1,
      deadline: new Date('2020-07-20 00:00:00'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      title: 'Tarefa do admin',
      description: 'descrição da tarefa',
      viewed: false,
      type:'prova',
      id_user: 1,
      id_task: 2,
      createdAt: new Date(),
      deadline: new Date('2020-05-10 00:00:00'),
      updatedAt: new Date()
    },{
      title: 'Terceira tarefa',
      description: 'Silvio Santos vem aí',
      viewed: false,
      type:'atividade',
      id_user: 1,
      id_task: 3,
      deadline: new Date('2020-10-20 00:00:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Tarefa do teste',
      description: 'Ta pegando fogo bixo',
      viewed: false,
      type:'prova',
      id_user: 2,
      id_task: 4,
      deadline: new Date('2020-12-15 00:00:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Háááá yeah yeah',
      description: 'Porta dos desesperados',
      viewed: false,
      type:'prova',
      id_user: 2,
      id_task: 5,
      deadline: new Date('2020-03-25 00:00:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notifications', null, {});
  }
};
