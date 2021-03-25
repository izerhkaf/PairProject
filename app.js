const express = require('express')
const app = express()
const PORT = 3000
const router = require('./Routes/Router.js')
const session = require('express-session')

app.use(session({
    secret: 'Session',
    resave: false,
    saveUninitialized: true,
}))

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))

app.use('/', router)

app.listen(PORT, () =>{
    console.log("Running");
})
