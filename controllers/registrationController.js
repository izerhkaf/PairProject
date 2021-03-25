const {Patient} = require('../models')

class RegistrationController {
    static create(req, res) {
        res.render('register')
    }
    static createPost(req, res) {
        Patient.create(req.body)
            .then(()=> {
                res.redirect('/patients') //sementara, harus diganti ke patients home
            })
            .catch(err=> {
                let messages = []
                if (err.name === "SequelizeValidationError") {
                       messages.push(err.errors[0].message)
                    }
                res.send(messages)
            })
    }
}

module.exports = RegistrationController