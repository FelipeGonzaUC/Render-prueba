'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserGroup.belongsTo(models.User, {
        foreignKey: 'username'
      });
      UserGroup.belongsTo(models.Group, {
        foreignKey: 'groupId'
      });
    }
  }

  UserGroup.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true // Assuming this is part of your composite key
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true // Assuming this is part of your composite key
    }
  }, {
    sequelize,
    modelName: 'UserGroup',
  });

  return UserGroup;
};
