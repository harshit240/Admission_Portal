const mongoose = require('mongoose')

const Courseschema = new mongoose.Schema({
    // user_id:{
    //     type:String,
    //     Required:true
    // },
    name:{
        type:String,
        Required:true
    },
    email:{
        type:String,
        Required:true
    },
    number:{
        type:String,
        Required:true
    },
    dob:{
        type:String,
        Required:true
    },
    gender:{
        type:String,
        Required:true
    },
    address:{
        type:String,
        Required:true
    },
    college:{
        type:String,
        Required:true
    },
    course:{
        type:String,
        Required:true
    },
    branch:{
        type:String,
        Required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        Required:true
    }
    
},{timestamps:true})

const CourseModel = mongoose.model('Registered_courses',Courseschema)

module.exports = CourseModel