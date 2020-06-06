'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    viewed: DataTypes.BOOLEAN,
    type: DataTypes.ENUM('prova', 'trabalho', 'atividade')
  }, {});
  Notification.associate = function(models) {
    // associations can be defined here
  };
  return Notification;
};