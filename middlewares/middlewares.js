class MiddleWare{
    static isLogin(req, res, next){
        if(req.session.isLogin){
            next()
        }else{
            res.redirect('/login')
        }
    }
    static isDoctor(req, res, next){
        if(req.session.role === "doctor"){
            next()
        }else{
            switch(req.session.role){
                case "admin":
                    res.redirect('/admin/home')
                break;
                case "patient":
                    res.redirect('/patient/home')
            }

        }
    }
    static isAdmin(req, res, next){
        if(req.session.role === "admin"){
            next()
        }else{
            switch(req.session.role){
                case "doctor":
                    res.redirect('/doctor/home')
                break;
                case "patient":
                    res.redirect('/patient/home')
            }
        }
    }
    static isPatient(req, res, next){
        if(req.session.role === "patient"){
            next()
        }else{
            switch(req.session.role){
                case "doctor":
                    res.redirect('/doctor/home')
                break;
                case "admin":
                    res.redirect('/admin/home')
            }
        }
    }
}

module.exports = MiddleWare