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
}
module.exports = AdminController