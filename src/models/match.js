'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Match.belongsToMany(models.User, { 
        through: 'UserMatch', 
        foreignKey: 'matchId' 
      });
    }
  }
  Match.init({
    private: DataTypes.BOOLEAN,
    state: DataTypes.STRING,
    gameState: DataTypes.JSON,
    maxPlayers: DataTypes.INTEGER,
    currentPlayers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};