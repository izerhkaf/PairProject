class MiddleWare{
    static isLogin(req, res, next){
        if(req.session.isLogin){
            next()
        }else{
            res.redirect('/login')
        }
    }
}

module.exports = MiddleWare