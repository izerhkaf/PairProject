'use strict';
const data = require('../Doctor.json')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

data.forEach((element) =>{
  element.createdAt = new Date()
  element.updatedAt = new Date()
  element.password = bcrypt.hashSync(element.password, salt)
})

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Doctors', data, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Doctors', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
