const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')

app.use(express.json())
//Body parser require
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:false }))
// parse application/json




app.set('view engine','ejs')
//routing
app.use('/',web)

//static file setup
app.use(express.static('public'))



//Database connection
const connectDB = require('./db/connectdb')
connectDB()



app.listen(port, () => {
    console.log(`Admission_portal app listening on port http://localhost:${port}`)
})