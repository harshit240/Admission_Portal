const UserModel = require("../models/User")

class FrontEndController{
    
    static login = async(req,res)=>{
        res.render('front/login',{message:req.flash('message'),error:req.flash('error')})
    }
    static register = async(req,res)=>{
        res.render('front/register',{message:req.flash('error')})
    }
    static about = async(req,res)=>{
        const { name, image, } = req.data1;
        res.render('front/about',{name: name, image: image})
    }
    static contact = async(req,res)=>{
        const { name, image, } = req.data1;
        res.render('front/contact',{name: name, image: image})
    }
    
}
module.exports = FrontEndController