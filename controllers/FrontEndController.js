const UserModel = require("../models/User")

class FrontEndController{
    static login = async(req,res)=>{
        res.render('front/login',{message:req.flash('message'),error:req.flash('error')})
    }
    static register = async(req,res)=>{
        res.render('front/register',{message:req.flash('error')})
    }
    
}
module.exports = FrontEndController