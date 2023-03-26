// const Passport = require("passport")
// const googleStrategy = require("passport-google-oauth20");
// const googleUserModel = require("../models/googleUser");


// module.exports =(passport)=>{
    
// Passport.use(new googleStrategy({
//     clientID:process.env.clientID,
//     clientSecret:process.env.clientSecret,
//     callbackURL:"http://localhost:3200/auth/google/callback"
//   },(accessToken,refreshToken,profile,done)=>{
//     console.log(profile.emails[0].value);
  
//     googleUserModel.findOne({googleId: profile.id}).then(existingUser=>{
//       if(existingUser){
//         //user exists 
//         //update data
//         done(null,existingUser)
//       }
//       else{
//         new googleUserModel({googleId: profile.id}).save().then(user => done(null, user))
//       }
//     })
//   }))
  
// }