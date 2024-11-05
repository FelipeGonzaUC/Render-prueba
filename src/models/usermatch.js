'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserMatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserMatch.belongsTo(models.User, {
        foreignKey: 'username'
      });
      UserMatch.belongsTo(models.Match, {
        foreignKey: 'matchId'
      });
    }
  }

  UserMatch.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true // Assuming this is part of your composite key
    },
    matchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true // Assuming this is part of your composite key
    }
  }, {
    sequelize,
    modelName: 'UserMatch',
  });

  return UserMatch;
};
