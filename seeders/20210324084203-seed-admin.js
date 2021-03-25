'use strict';
const data = require('../data/admin.json')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

data.forEach((element) =>{
  element.createdAt = new Date()
  element.updatedAt = new Date()
  element.password = bcrypt.hashSync(element.password, salt)
})

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Admins', data, {})
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
    return queryInterface.bulkDelete('Admins', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
