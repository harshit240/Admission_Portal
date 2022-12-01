const CourseModel = require("../../models/Courses");

class AdminController{
    static dashboard = async (req, res) => {
        try {
          const { name, image } = req.data1;
          const d = await CourseModel.find()
          res.render("admin/dashboard", { adata:d,name: name, image: image });
        } catch (err) {
          console.log(err);
        }
      };

    static UpdateStatus = async (req, res) => {
        try {
          const { status, comment } = req.body;
          // console.log(status);
          // console.log(comment);
          const result = await CourseModel.findByIdAndUpdate(req.params.id,{
            status:status,
            comment:comment
          })
          const data = await result.save()
          res.redirect('/admin/dashboard')
        } catch (err) {
          console.log(err);
        }
      };
}
module.exports = AdminController