const CourseModel = require("../models/Courses");
const UserModel = require("../models/User");

class CourseController {

  static dashboard = async (req, res) => {
    try {
      const { name, image,_id } = req.data1;
      // console.log(_id);
      const btech = await CourseModel.findOne({user:_id,course:'B.Tech'})
      const bca = await CourseModel.findOne({user:_id,course:'BCA'})
      const mca = await CourseModel.findOne({user:_id,course:'MCA'})
      // console.log(_id);
      res.render("user/dashboard", { name: name, image: image,b:btech,bc:bca,m:mca});
    } catch (err) {
      console.log(err);
    }
  };

  static course_form = async (req, res) => {
    try {
      const { name, email, image } = req.data1;
      res.render("user/course_form", {
        name: name,
        email: email,
        image: image,
      });
    } catch (err) {
      console.log(err);
    }
  };

  static course_form2 = async (req, res) => { //BCA
    try {
      const { name, email, image } = req.data1;
      res.render("user/course_form2", {
        name: name,
        email: email,
        image: image,
      });
    } catch (err) {
      console.log(err);
    }
  };

  static course_form3 = async (req, res) => { //MCA
    try {
      const { name, email, image } = req.data1;
      res.render("user/course_form3", {
        name: name,
        email: email,
        image: image,
      });
    } catch (err) {
      console.log(err);
    }
  };

  static displaycourse = async (req, res) => {
    try {
      const { name, email, image,_id } = req.data1;
      const d = await CourseModel.find({user:_id})
      res.render("user/displaycourse", {data:d,name:name,email:email,image:image});
    } catch (err) {
      console.log(err);
    }
  }
  
  static Register = async (req, res) => {

    const { name, email, number,dob,gender,address,college,course,branch } = req.body;
    try {
      const result = await CourseModel({
        name: name,
        email: email,
        number:number,
        dob:dob,
        gender:gender,
        address:address,
        college:college,
        course:course,
        branch:branch,
        user:req.data1.id
      })
      await result.save();
      return res.redirect("/course/courseview");
    } catch (error) {
      console.log(error);
    }
  };
  
  static viewcourse = async (req, res) => {
    try {
      const { name, image,email } = req.data1;
      const data = await CourseModel.findById(req.params.id)
      console.log(data);
      res.render('user/viewcourse',{ name: name, image: image,email:email ,viewdata:data})
      
    } catch (error) {
      console.log(error);
    }
  }
  
  static EditCourse = async (req, res) => {
    try {
      const { name, image,email } = req.data1;
      const data = await CourseModel.findById(req.params.id)
      // console.log(data);
      res.render('user/editcourse',{ name: name, image: image,email:email ,editdata:data})
      
    } catch (error) {
      console.log(error);
    }
  }
  
  static UpdateCourse = async (req, res) =>{
    try {
      const { name, image} = req.data1;
      // console.log(user);
      const result = await CourseModel.findByIdAndUpdate(req.params.id,req.body)
      res.redirect('/course/courseview')
      await result.save()
    } catch (err) {
      console.log(err);
    }
  }

}
module.exports = CourseController;
