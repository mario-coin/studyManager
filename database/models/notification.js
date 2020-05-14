'use strict';
module.exports = (sequelize, DataTypes) => {
  const notification = sequelize.define('notification', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    viewed: DataTypes.BOOLEAN,
    type: DataTypes.ENUM('prova', 'trabalho', 'atividade')
  }, {});
  notification.associate = function(models) {
    // associations can be defined here
  };
  return notification;
};