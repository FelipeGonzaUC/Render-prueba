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
      User.belongsToMany(models.Match, { 
        through: 'UserMatch', 
        foreignKey: 'username' 
      });
      User.belongsToMany(models.Group, { 
        through: 'UserGroup', 
        foreignKey: 'username' 
      });
    }
  }
  User.init({
    username: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.STRING
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    wins: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};