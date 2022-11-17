const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    idMoodle: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
    },
    passwordResetToken: {
      type: DataTypes.STRING
    },
    passwordResetExpires: {
      type: DataTypes.DATE
    }
  }, 
  
  {
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
      expiresIn: 86400 //24 hours
    });
  };

  return User;
};