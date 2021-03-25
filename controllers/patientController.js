const { Patient, Doctor, DoctorPatient } = require('../models')
const getFormattedDate = require('../helpers/getFormattedDate')

class PatientController{

    static test(req, res) {
        res.send('temporary landing page')
    }
    static showProfile (req, res) {
        Patient.findByPk(req.params.id)
        .then(patient => {
            // res.send(patient)
            res.render('patientProfile', {patient, id:req.params.id, getFormattedDate})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static create(req, res) {
        Doctor.findAll()
        .then(doctor=> {
            res.render('patientConsultation', {doctor})
        })
        .catch(err => {
            let messages = []
            if (err.name === "SequelizeValidationError") {
                   messages.push(err.errors[0].message)
                }
            res.send(messages)
        })
    }

    static createPost(req, res) {
        let input = req.body
        input.patientId = req.params.id
        DoctorPatient.create(input) 
        .then(()=> {
            res.redirect('/patients') //sementara, harus diganti ke patients home
        })
        .catch(err=> {
            res.send(err)
        })
    }

    static update(req, res) {
        Patient.findByPk(req.params.id)
        .then(patient=> {
            res.render('patientProfileEdit', {patient, id: req.params.id})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static updatePost(req, res) {
        Patient.update(req.body, {where: {id: req.params.id}}) 
        .then(()=> {
            res.redirect('/patients') //sementara, harus diganti ke patients home
        })
        .catch(err=> {
            res.send(err)
        })
    }
}

module.exports = PatientController