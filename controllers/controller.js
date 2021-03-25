const { Admin, Doctor, Patient, DoctorPatient} = require('../models/index')
const bcrypt = require('bcryptjs')
const helpers = require('../helpers/helpers.js')
const axios = require('axios')

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
                            req.session.role = req.body.role
                            req.session.userid = data.id
                            res.redirect('/doctor/home')
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
                        req.session.role = req.body.role
                        req.session.userid = data.id
                        res.redirect('/patient/home')
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
                        req.session.role = req.body.role
                        req.session.userid = data.id
                        res.redirect('/admin/home')
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

    static logout(req, res){
        req.session.destroy()
        res.redirect('/login')
    }

    static showDoctorHome(req, res){
        // res.send(req.session.role + req.session.username + req.session.isLogin)
        let datas = {}
        Doctor.findOne({
            where: {username: req.session.username},
            include: Patient
        })
            .then((doctor) =>{
                datas.doctor = doctor
                return DoctorPatient.findAll({where: {doctorId: req.session.userid}})
            })
            .then((doctorpatient) =>{
                datas.doctorpatient = doctorpatient
                res.render('doctorHome', {datas, helpers})
            })
            .catch((err) =>{
                res.send(err)
            })
            
    }

    static showAdminHome(req, res){
        let adminDatas = {}
        Doctor.findAll({order: [["name", 'ASC']]})
            .then((doctor) =>{
                adminDatas.doctor = doctor
                return Patient.findAll({order: [["name", 'ASC']]})
            })
            .then((patient) =>{
                adminDatas.patient = patient
                // res.send(adminDatas)
                res.render('adminHome', {adminDatas, helpers})
            })
            .catch((err) =>{
                res.send(err)
            })
    }

    static sendReceipt(req, res){
        let datas = {}
        DoctorPatient.findOne({where: {consultationId: req.params.id}})
            .then((data) =>{
                datas.junction = data
                return Doctor.findOne({where: {id: data.doctorId}})
            })
            .then((doctor) =>{
                datas.doctor = doctor
                return Patient.findOne({where: {id: datas.junction.patientId}})
            })
            .then((patient) =>{
                datas.patient = patient
                res.render('sendReceipt', {datas, helpers})
            })
            .catch((err) =>{
                res.send(err)
            })

    }

    static sendReceiptPost(req, res){
        DoctorPatient.findOne({where: {consultationId: req.params.id}})
            .then((data) =>{
                return Patient.findOne({where: {id: data.patientId}})
            })
            .then((patient) =>{
                const phone = patient.phone_number
                const message = `${req.body.receipt}`
                const url = `http://fortislook.hol.es/komu?pid=1374811u89&num=${phone}&type=1&message=${message}`;
                axios.get(url,{
                    timeout:0
                })
                .then((resp) =>{
                    console.log(resp);
                })
                .catch((error) =>{
                    console.log(error);
                });
            })

        DoctorPatient.update({
            receipt: req.body.receipt,
            isDone: true
        },{where: {
            consultationId: req.params.id
        }})
        .then((data) =>{
            res.redirect('/doctor/home')
        })
        .catch((err) =>{
            res.send(err)
        })
    }

    static addDoctor(req, res){
        let errorList = []
        if(req.query.errormessage){
            errorList = req.query.errormessage
            errorList = errorList.split(',')
        }
        res.render('addDoctor', {errorList})
    }

    static addDoctorPost(req, res){
        Doctor.create({
            name: req.body.name,
            specialist: req.body.specialist,
            gender: req.body.gender,
            username: req.body.username,
            password: req.body.password
        })
            .then((data) =>{
                res.redirect('/admin/home')
            })
            .catch((err) =>{
                let errList = []
                if(err.name === "SequelizeValidationError"){
                    err.errors.forEach(element => {
                        errList.push(element.message)
                    });
                    errList = errList.join(', ')
                    res.redirect(`/add/doctor?errormessage=${errList}`) 
                }else{
                    res.send(err)
                }
            })
    }

    static updateDoctor(req, res){
        let errorList = []
        if(req.query.errormessage){
            errorList = req.query.errormessage
            errorList = errorList.split(',')
        }
        Doctor.findOne({where: {id: +req.params.id}})
            .then((data) =>{
                res.render('updateDoctor', {data, errorList})
            })
            .catch((err) =>{
                res.send(err)
            })
    }

    static updateDoctorPost(req, res){
        Doctor.update({
            name: req.body.name,
            specialist: req.body.specialist,
            gender: req.body.gender,
            username: req.body.username
        }, {where: {id: req.params.id}})
            .then((data) =>{
                res.redirect('/admin/home')
            })
            .catch((err) =>{
                let errList = []
                if(err.name === "SequelizeValidationError"){
                    err.errors.forEach(element => {
                        errList.push(element.message)
                    });
                    errList = errList.join(', ')
                    res.redirect(`/doctor/update/${req.params.id}?errormessage=${errList}`) 
                }else{
                    res.send(err)
                }
            })
    }

    static deleteDoctor(req, res){
        Doctor.destroy({where: {id: req.params.id}})
            .then((data) =>{
                res.redirect('/admin/home')
            })
            .catch((err) =>{
                res.send(err)
            })
    }

    static deletePatient(req, res){
        Patient.destroy({where: {id: req.params.id}})
            .then((data) =>{
                res.redirect('/admin/home')
            })
            .catch((err) =>{
                res.send(err)
            })
    }

    static showPatientHome(req, res){
        let datas = {}
        DoctorPatient.findAll({where: {patientId: req.session.userid}})
            .then((data) =>{
                datas.junction = data
                return Patient.findOne({where: {id: req.session.userid}})
            })
            .then((patient) =>{
                datas.patient = patient
                return Doctor.findAll()
            })
            .then((doctor) =>{
                datas.doctor = doctor
                res.render('patientHome', {datas, helpers})
            })
            .catch((err) =>{
                res.send(err)
            })
    }
}

module.exports = Controller