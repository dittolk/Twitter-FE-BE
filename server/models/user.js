'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Tweet)
    }
  }
  User.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    bio:{
      type: DataTypes.STRING,
      allowNull: true
    },
    referral:{
      type: DataTypes.STRING,
      allowNull: true
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};