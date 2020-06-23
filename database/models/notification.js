'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    viewed: DataTypes.BOOLEAN,
    type: DataTypes.ENUM('prova', 'trabalho', 'atividade'),
    id_user: DataTypes.INTEGER,
    id_task: DataTypes.INTEGER,
  }, {});
  Notification.associate = function(models) {
    // associations can be defined here
  };
  return Notification;
};