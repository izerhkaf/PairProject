const express = require('express')
const app = express()
const PORT = 3000
const router = require('./Routes/Router.js')

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))

app.use('/', router)

app.listen(PORT, () =>{
    console.log("Running");
})
