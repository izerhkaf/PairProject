const router = require('express').Router()
const patientRouter = require('./patientRoute')
const registrationRouter = require('./registrationRoute')

router.use('/patients', patientRouter)
router.use('/registration', registrationRouter)






module.exports = router