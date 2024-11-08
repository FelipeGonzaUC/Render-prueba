'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invitations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Groups', // nombre de la tabla User
          key: 'id'  // la columna en User que se va a referenciar
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ownername: {
        type: Sequelize.STRING,
        references: {
          model: 'Users', // nombre de la tabla User
          key: 'username'  // la columna en User que se va a referenciar
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
    await queryInterface.dropTable('Invitations');
  }
};