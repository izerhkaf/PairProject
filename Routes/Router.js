const router = require('express').Router()
const Controller = require('../controllers/controller.js')
const MiddleWare = require('../middlewares/middlewares.js')

//login logout
router.get('/login', Controller.login)
router.post('/login', Controller.checkLogin)
router.get('/logout', Controller.logout)

//home
router.get('/doctor/home', MiddleWare.isLogin, MiddleWare.isDoctor, Controller.showDoctorHome)
router.get('/admin/home', MiddleWare.isLogin, MiddleWare.isAdmin, Controller.showAdminHome)
router.get('/patient/home', MiddleWare.isLogin, MiddleWare.isPatient, Controller.showPatientHome)

//doctor
router.get('/sendreceipt/:id', MiddleWare.isLogin, MiddleWare.isDoctor, Controller.sendReceipt)
router.post('/sendreceipt/:id', Controller.sendReceiptPost)

//admin
router.get('/add/doctor', MiddleWare.isLogin, MiddleWare.isAdmin, Controller.addDoctor)
router.post('/add/doctor', MiddleWare.isLogin, MiddleWare.isAdmin, Controller.addDoctorPost)
router.get('/doctor/update/:id', MiddleWare.isLogin, MiddleWare.isAdmin, Controller.updateDoctor)
router.post('/doctor/update/:id', MiddleWare.isLogin, MiddleWare.isAdmin, Controller.updateDoctorPost)
router.get('/doctor/delete/:id', MiddleWare.isLogin, MiddleWare.isAdmin, Controller.deleteDoctor)
router.get('/patient/delete/:id', MiddleWare.isLogin, MiddleWare.isAdmin, Controller.deletePatient)

router.get('/patient/add', MiddleWare.isLogin, MiddleWare.isPatient, Controller.create)
router.post('/patient/add', MiddleWare.isLogin, MiddleWare.isPatient, Controller.createPost)


module.exports = router