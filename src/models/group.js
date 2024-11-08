'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsTo(models.User, {
        foreignKey: 'ownername',
        targetKey: 'username'
      });
      Group.belongsToMany(models.User, { 
        through: 'UserGroup', 
        foreignKey: 'groupId' 
      });
    }
  }
  Group.init({
    groupname: DataTypes.STRING,
    ownername: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};