const express = require('express')
const patientRouter = express.Router()
const PatientController = require('../controllers/patientController')

patientRouter.get('/', PatientController.test)
patientRouter.get('/profile/:id', PatientController.showProfile)
patientRouter.get('/add/:id', PatientController.create)
patientRouter.post('/add/:id', PatientController.createPost)
patientRouter.get('/profile/:id/edit', PatientController.update)
patientRouter.post('/profile/:id/edit', PatientController.updatePost)

module.exports = patientRouter