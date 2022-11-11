const cloudinary = require("cloudinary").v2;
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: "dqowaxfln",
  api_key: "456697836426261",
  api_secret: "Fnb8mKrkYZrTaeS71e-YpnssgDo",
  secure: true,
});

class UserController {

  static register = async (req, res) => {
    // console.log(req.body);

    const { name, email, password, confirm_password, profile_image } = req.body;
    const admin = await UserModel.findOne({ email: email });

    if (admin) {
      req.flash("error", "Email already exists");
    //   console.log("email exists");
      return res.redirect("/register");
    } else {
      if (name && email && password && confirm_password) {
        if (password == confirm_password) {
          try {
            // console.log("I m in saving part");
            const imagefile = req.files.profile_image
        // console.log(imagefile);
        const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder:'Profile_pictures',
            width:400,
        })
            const hashpassword = await bcrypt.hash(password, 10);
            // console.log(hashpassword);
            const result = await UserModel({
              name: name,
              email: email,
              password: hashpassword,
              image: {
                public_id: image_upload.public_id,
                url: image_upload.secure_url,
              },
            });
            await result.save();
            req.flash("message", "Registration Successful! Do login!");
            return res.redirect("/");
          } catch (err) {
            console.log(err);
          }
        } else {
          req.flash("error", "Password and Confirm password doesn`t match");
          return res.redirect("/register");
        }
      } else {
        req.flash("error", "All Fields are Required");
        return res.redirect("/register");
      }
    }
  };

  static verify_login = async (req, res) => {
    // console.log(req.body);
    try {
      const {email, password } = req.body;
      if(email && password){
        const user = await UserModel.findOne({email:email})

        if(user != null){
            const isMatched = await bcrypt.compare(password,user.password)
            if((user.email === email) && isMatched){
              //verify token
              const token = jwt.sign({ userId: user._id }, "himanshu123");
              // console.log(token);
              res.cookie("token", token);
                res.redirect('/dashboard')
            }else{
                req.flash('error','Email or password is not valid')
                return res.redirect('/')
            }
        }else{
            req.flash('error','You are not a registered user')
            return res.redirect('/')
        }
      }else{
        req.flash('error','All Fields Required')
        return res.redirect('/')
      }
    } catch (err) {
      console.log(err);
    }
  }

  static logout = async(req,res)=>{
    try{
      res.clearCookie("token");
      res.redirect('/')
    }catch(err){
        console.log(err);
    }
  }
}
module.exports = UserController;
