const { Admin, Doctor, Patient, DoctorPatient} = require('../models/index')
const bcrypt = require('bcryptjs')

class Controller{
    static login(req, res){
        let errorList = []
        if(req.query.errormessage){
            errorList = req.query.errormessage
            errorList = errorList.split(',')
        }
        res.render('login', {errorList})
    }

    static checkLogin(req, res){
        switch(req.body.role){
            case "doctor":
                Doctor.findOne({where: {username: req.body.username}})
                    .then((data) =>{
                        if(bcrypt.compareSync(req.body.password, data.password)){
                            req.session.isLogin = true
                            req.session.username = data.username
                            res.redirect('/home')
                        }else{
                            res.redirect('/login?errormessage=username or password is incorrect')
                        }     
                    })
                    .catch((err) =>{
                        res.redirect('/login?errormessage=username is not registered')
                    })
            break;
            case "patient":
                Patient.findOne({where: {username: req.body.username}})
                .then((data) =>{
                    if(bcrypt.compareSync(req.body.password, data.password)){
                        req.session.isLogin = true
                        req.session.username = data.username
                        res.redirect('/home')
                    }else{
                        res.redirect('/login?errormessage=password is incorrect')
                    }     
                })
                .catch((err) =>{
                    res.redirect('/login?errormessage=username is not registered')
                })
            break;
            case "admin":
                Admin.findOne({where: {username: req.body.username}})
                .then((data) =>{
                    if(bcrypt.compareSync(req.body.password, data.password)){
                        req.session.isLogin = true
                        req.session.username = data.username
                        res.redirect('/home')
                    }else{
                        res.redirect('/login?errormessage=password is incorrect')
                    }     
                })
                .catch((err) =>{
                    res.redirect('/login?errormessage=username is not registered')
                })
            break;
            default:
                res.redirect('/login?errormessage=Please Choose Role')
            break;
        }
    }

    static showHome(req, res){
        
    }
}

module.exports = Controller