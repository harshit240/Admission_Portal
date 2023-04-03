const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

class FrontEndController {

  static login = async (req, res) => {
    try {
      const { token } = req.cookies;
      // console.log(token);
      if (token) {
        res.redirect('/dashboard')
      } 
      else {
        res.render("front/login", {message: req.flash("message"),error: req.flash("error")});
      }
    } catch (error) {
      console.log(error);
    }
  };
  static register = async (req, res) => {
    res.render("front/register", { message: req.flash("error") });
  };
  static about = async (req, res) => {
    const { name, image } = req.data1;
    res.render("user/about", { name: name, image: image });
  };
  static contact = async (req, res) => {
    const { name, image } = req.data1;
    res.render("user/contact", { name: name, image: image });
  };
  static forgot_password = async (req, res) => {
    res.render("front/forgot_password", {message: req.flash("message"),error: req.flash("error")});
  };
  static reset_password = async(req,res)=>{
    try {
        const { id, token } = req.params;
        // console.log(req.params);
        //Check if this id is exist in database
        const user = await UserModel.findById(req.params.id);
    
<<<<<<< HEAD
        if (user) {
          const secret = process.env.JWT_SECRET_KEY + user.password;
          const payload = jwt.verify(token,secret)
          res.render('front/reset-password',{email:user.email})
        } else {
          req.flash("error", "This Email does not exist");
        }
=======
    static login = async(req,res)=>{
        res.render('front/login',{message:req.flash('message'),error:req.flash('error')})
    }
    static register = async(req,res)=>{
        res.render('front/register',{message:req.flash('error')})
    }
    static about = async(req,res)=>{
        const { name, image, } = req.data1;
        res.render('/',{name: name, image: image})
    }
    static contact = async(req,res)=>{
        const { name, image, } = req.data1;
        res.render('/',{name: name, image: image})
    }
>>>>>>> a4f07870fdcf4e07c573c0fa15687b4f9791f709
    
      } catch (error) {
        console.log(error);
      }
  }
  
}
<<<<<<< HEAD
module.exports = FrontEndController;
=======
module.exports = FrontEndController
>>>>>>> a4f07870fdcf4e07c573c0fa15687b4f9791f709
