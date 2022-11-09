const UserModel = require("../models/User");

class UserController{

    static register = async(req,res)=>{
        
        console.log(req.body);
        try{
            const{name,email,password,confirm_password}=req.body
            const data = new UserModel({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            await data.save()
            // console.log(req.body);
            res.redirect('/')
        }catch(err){
            console.log(err);
        }
    } 
    
}
module.exports = UserController