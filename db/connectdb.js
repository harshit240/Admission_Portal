const mongoose = require('mongoose');

<<<<<<< HEAD
 
const connectdb = ()=>{
    return mongoose.connect(process.env.DB_URL) 
    .then((data)=>{
        console.log(`Mongodb connected with server:${data.connection.host}`);
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports  =  connectdb
=======
const connectDb = () =>{
  
    return mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("connected sucessfully");
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports = connectDb
>>>>>>> a4f07870fdcf4e07c573c0fa15687b4f9791f709
