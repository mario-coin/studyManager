'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [{
      name: 'Outra do admin',
      description: 'Olloooquinho meu',
      start_date: new Date('2020-07-08 00:00:00'),
      deadline: new Date('2020-07-20 00:00:00'),
      complexity:'mediano',
      duration: 3,
      type: 'trabalho',
      situation: 'pendente',
      id_user: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      
    },{
      name: 'Tarefa do admin',
      description: 'descrição da tarefa',
      start_date: new Date('2020-05-08 00:00:00'),
      deadline: new Date('2020-05-10 00:00:00'),
      complexity:'facil',
      duration: 7,
      type: 'prova',
      situation: 'desenvolvendo',
      id_user: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Terceira tarefa',
      description: 'Silvio Santos vem aí',
      start_date: new Date('2020-10-17 00:00:00'),
      deadline: new Date('2020-10-20 00:00:00'),
      complexity:'dificil',
      duration: 7,
      type: 'atividade',
      situation: 'concluido',
      id_user: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Tarefa do teste',
      description: 'Ta pegando fogo bixo',
      start_date: new Date('2020-11-05 00:00:00'),
      deadline: new Date('2020-12-15 00:00:00'),
      complexity:'mediano',
      duration: 7,
      type: 'prova',
      situation: 'pendente',
      id_user: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Háááá yeah yeah',
      description: 'Porta dos desesperados',
      start_date: new Date('2020-03-23 00:00:00'),
      deadline: new Date('2020-03-25 00:00:00'),
      complexity:'dificil',
      duration: 2,
      type: 'prova',
      situation: 'desenvolvendo',
      id_user: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
