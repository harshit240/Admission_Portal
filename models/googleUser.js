const mongoose = require('mongoose')

const googleUserschema = new mongoose.Schema({
    googleId: String,
},
{timestamps:true})
const googleUserModel = mongoose.model('googleUser',googleUserschema)

module.exports = googleUserModel