const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: async (user, options) => {
        user.password = await bcrypt.hash(user.password, 8);
      }
    },
  });

  User.prototype.compareHash = function(hash) {
    return bcrypt.compare(hash, this.password);
  };
  
  User.prototype.generateToken = function() {
    return jwt.sign({ id: this.id }, "secret", {
      expiresIn: 86400
    });
  };

  return User;
};