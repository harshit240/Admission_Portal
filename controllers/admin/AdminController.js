const CourseModel = require("../../models/Courses");
const UserModel = require("../../models/User");

class AdminController {
  static dashboard = async (req, res) => {
    try {
      const { name, image } = req.data1;
      res.render("admin/dashboard", { name: name, image: image });
    } catch (err) {
      console.log(err);
    }
  };
  static registercourse = async (req, res) => {
    try {
      const { name, email, image } = req.data1;
      res.render("admin/registercourse", {
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
      const { name, email, image } = req.data1;
      const d = await CourseModel.find()
      res.render("admin/displaycourse", {data:d,name:name,email:email,image:image});
    } catch (err) {
      console.log(err);
    }
  };
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
      })
      await result.save();
      return res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  static EditCourse = async (req, res) => {
    try {
      const { name, image,email } = req.data1;
      const data = await CourseModel.findById(req.params.id)
      // console.log(data);
      res.render('admin/editcourse',{ name: name, image: image,email:email ,editdata:data})

    } catch (error) {
      console.log(error);
    }
  }
  static viewcourse = async (req, res) => {
    try {
      const { name, image,email } = req.data1;
      const data = await CourseModel.findById(req.params.id)
      // console.log(data);
      res.render('admin/viewcourse',{ name: name, image: image,email:email ,viewdata:data})

    } catch (error) {
      console.log(error);
    }
  }
  static UpdateCourse = async (req, res) =>{
    try {
      const user = await CourseModel.findById(req.params.id)
      // console.log(user);
      const result = await CourseModel.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        email: req.body.email,
        number:req.body.number,
        dob:req.body.dob,
        gender:req.body.gender,
        address:req.body.address,
        college:req.body.college,
        course:req.body.course,
        branch:req.body.branch,
      })
      await result.save()
      res.redirect('admin/displaycourse')
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = AdminController;
