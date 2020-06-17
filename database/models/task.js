'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    start_date: DataTypes.DATE,
    deadline: DataTypes.DATE,
    complexity: DataTypes.ENUM('facil','mediano','dificil'),
    duration: DataTypes.INTEGER,
    type: DataTypes.ENUM('prova', 'trabalho', 'atividade'),
    situation: DataTypes.ENUM('pendente', 'desenvolvendo', 'concluido'),
    dependency: DataTypes.INTEGER
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};