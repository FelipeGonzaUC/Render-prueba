'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invitation.belongsTo(models.Group, {
        foreignKey: 'groupId',
        targetKey: 'id'
      });
      Invitation.belongsTo(models.User, {
        foreignKey: 'ownername',
        targetKey: 'username'
      });
    }
  }
  Invitation.init({
    groupId: DataTypes.INTEGER,
    ownername: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Invitation',
  });
  return Invitation;
};