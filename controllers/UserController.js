const cloudinary = require("cloudinary").v2;
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')

const sendResetPasswordMail = async(name,email,link)=>{
  try {
    const transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:"601himanshusahu@gmail.com",
        pass:'caquyglezfwzuyna'
      },
      port:process.env.PORT,
      host:'smtp.gmail.com'
    })

    const mailOptions = {
      from:'601himanshusahu@gmail.com',
      to:email,
      subject:'[Admission Portal] Password Reset E-mail',
      // html:'<p> Hii ' + name + ',<br> Please click on this link '+ link +'  for Reset your password'
      html:`You're receiving this e-mail because you or someone else has requested a password reset for your user account at . <br><br>

      Click the link below to reset your password: <br>` + link + `<br> <br> If you did not request a password reset you can safely ignore this email.`
    }

    transporter.sendMail(mailOptions,function(error,info){
      if (error) {
        console.log(error);
      } 
      // else {
      //   console.log('Mail has been sent :-' + info.response);
      // }
    })

  } catch (error) {
    console.log(error);
  }
}

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
            })
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
  }

  static verify_login = async (req, res) => {
    // console.log(req.body);
    try {
      const {email, password } = req.body;
      if(email && password){
        const user = await UserModel.findOne({email:email})

        if(user != null){
            const isMatched = await bcrypt.compare(password,user.password)
            if((user.email === email) && isMatched){
              if (user.role == 'user') {
                //verify token
              const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY,{
                expiresIn:'100m'
              });
              // console.log(token);
              res.cookie("token", token);
              res.redirect('/dashboard')
              }
              
              if (user.role == 'admin') {
                //verify token
              const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY,{
                expiresIn:'20m'
              })
              // console.log(token);
              res.cookie("token", token);
              res.redirect('/admin/dashboard')
              }
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

  static Change_password = async(req,res)=>{
    try {
      const{old_password,new_password,confirm_password} = req.body
      // console.log(req.body);
      const {_id } = req.data1;
      // console.log(_id);
      const user = await UserModel.findOne({id:_id});
      const isMatched = await bcrypt.compare(old_password,user.password)

      if((new_password === confirm_password) && isMatched){
        const hashpassword = await bcrypt.hash(new_password, 10);
        // console.log(hashpassword);

        const result = await UserModel.findByIdAndUpdate(req.data1._id,{password:hashpassword})
        // console.log("update done");
        await result.save()
        res.clearCookie("token");
        req.flash('message','Password Changed Succesfully! Do Login!');
        res.redirect('/')
      }else{
        req.flash('error','Wrong password')
        res.redirect('/dashboard')
      }
    } catch (error) {
      console.log(error);
    }

  }

  static forgot_password = async(req,res)=>{
    try {
      const email = req.body.email
      const userData = await UserModel.findOne({email:req.body.email});

      if (userData) {
        const secret = process.env.JWT_SECRET_KEY + userData.password
        const token = jwt.sign({ userId: userData._id }, secret,{
          expiresIn:'15m'
        }) 
        const link = `https://mits-admission-portal.onrender.com/reset-password/${userData._id}/${token}`
        // console.log(link);
        // calling method
        sendResetPasswordMail(userData.name,userData.email,link)
        req.flash('message','Please check your Email for Reset password link')
        res.redirect('/');
      } else {
        req.flash('error','This Email does not exist')
        res.redirect('/forgot_password')
      }

    } catch (error) {
      console.log(error);
    }

  }

  static reset_password = async(req,res)=>{

    try {
      const{id,token} = req.params
      const{password,confirm_password} = req.body
      // console.log(req.body);
  
      const user = await UserModel.findById(req.params.id)
      // console.log(user);
      if(id !== user.id){
        req.flash('error','Unauthorized reset password')
        res.render('front/reset_password')
      }
      const secret = process.env.JWT_SECRET_KEY + user.password
      const verfiyToken = jwt.verify(token,secret)
      
      if(password === confirm_password){
        // console.log(password + confirm_password);
        const hashpassword = await bcrypt.hash(password, 10);
        // console.log(hashpassword);
        const result = await UserModel.findByIdAndUpdate(req.params.id,{password:hashpassword})
        await result.save()
        req.flash('message','Password Changed successfully Do login!')
        res.redirect("/")
      }
    } catch (error) {
      console.log(error);
    }

  }

}
module.exports = UserController;
