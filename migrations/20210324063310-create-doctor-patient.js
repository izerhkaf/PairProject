'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DoctorPatients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctorId: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "Doctors"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      patientId: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "Patients"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      receipt: {
        type: Sequelize.STRING
      },
      diagnosa: {
        type: Sequelize.STRING
      },
      isDone: {
        type: Sequelize.BOOLEAN
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DoctorPatients');
  }
};