const express = require('express')
const registrationRouter = express.Router()
const RegistrationController = require('../controllers/RegistrationController')

registrationRouter.get('/', RegistrationController.create)
registrationRouter.post('/', RegistrationController.createPost)

module.exports = registrationRouter