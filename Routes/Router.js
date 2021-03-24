const router = require('express').Router()
const Controller = require('../controllers/controller.js')
const MiddleWare = require('../middlewares/middlewares.js')


router.get('/login', Controller.login)
router.post('/login', Controller.checkLogin)
router.get('/home', MiddleWare.isLogin, Controller.showHome)

module.exports = router