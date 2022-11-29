const express = require('express')
const app = express()
// const port = process.env.PORT || 3200

const dotenv = require('dotenv')
dotenv.config({path:'.env'})
const web = require('./routes/web')
const api = require('./routes/api')
const fileUpload = require("express-fileupload");

//Temp file uploader
app.use(fileUpload({useTempFiles: true}));

//Required Cloudinary
const cloudinary = require('cloudinary');

//connect flash and sessions
const session = require('cookie-session')
const flash = require('connect-flash');

//cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser())

//messages
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,

    saveUninitialized: false,
  }));
//Flash messages
app.use(flash());



//Body parser require
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:false }))
// parse application/json
app.use(express.json())

  //Database connection
const connectDB = require('./db/connectdb')
connectDB()

//routing
app.use('/',web)

// API ROUTING
app.use('/api',api)

// ejs setup(template)
app.set('view engine','ejs')

//static file setup
app.use(express.static('public'))








app.listen(process.env.PORT, () => {
    console.log(`Admission_portal app listening on port http://localhost:${process.env.PORT}`)
})
