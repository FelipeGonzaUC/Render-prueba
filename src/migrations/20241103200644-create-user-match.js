'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserMatches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        references: {
          model: 'Users', // nombre de la tabla User
          key: 'username'  // la columna en User que se va a referenciar
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      matchId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Matches', // nombre de la tabla User
          key: 'id'  // la columna en User que se va a referenciar
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserMatches');
  }
};