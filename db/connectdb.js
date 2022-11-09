const mongoose = require('mongoose')

const connectDb = () =>{
    return mongoose.connect('mongodb://localhost:27017/Admission_portal')
    .then(()=>{
        console.log("connected sucessfully");
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports = connectDb