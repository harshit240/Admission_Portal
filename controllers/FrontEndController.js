const UserModel = require("../models/User")

class FrontEndController{
    static login = async(req,res)=>{
        res.render('front/login',{message:req.flash('message'),error:req.flash('error')})
    }
    static register = async(req,res)=>{
        res.render('front/register',{message:req.flash('error')})
    }
    static dashboard = async(req,res)=>{
        try{
            const data1 = await UserModel.find()
            res.render('admin/dashboard',{data:data1})
        }catch(err){
            console.log(err);
        }
    }
}
module.exports = FrontEndController