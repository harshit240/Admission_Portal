const express = require("express");
const AdminController = require("../controllers/admin/AdminController");
const CourseController = require("../controllers/CourseController");
const FrontEndController = require("../controllers/FrontEndController");
const UserController = require("../controllers/UserController");
const CheckUserAuth = require("../middleware/auth");
const AuthRole = require("../middleware/authrole");
const UserModel = require("../models/User");
const router = express.Router();

//FrontEndController
router.get("/", FrontEndController.login);
router.get("/register", FrontEndController.register);
router.get("/about", CheckUserAuth, FrontEndController.about);
router.get("/contact", CheckUserAuth, FrontEndController.contact);
router.get("/dashboard", CheckUserAuth, CourseController.dashboard);
router.get("/forgot_password", FrontEndController.forgot_password);

//UserController
router.post("/user/register", UserController.register);
router.post("/user/login", UserController.verify_login);
router.get("/logout", UserController.logout);

//changepassword
router.post("/Change_password", CheckUserAuth, UserController.Change_password);

//CourseController
router.get("/course/btech", CheckUserAuth, CourseController.course_form);
router.get("/course/bca", CheckUserAuth, CourseController.course_form2);
router.get("/course/mca", CheckUserAuth, CourseController.course_form3);

router.post("/register/btech", CheckUserAuth, CourseController.Register);
router.post("/register/bca", CheckUserAuth, CourseController.Register);
router.post("/register/mca", CheckUserAuth, CourseController.Register);

// router.get('/course/bca/:id',CheckUserAuth,CourseController.displaycourse)
router.get("/viewcourse/:id", CheckUserAuth, CourseController.viewcourse);
router.get("/editcourse/:id", CheckUserAuth, CourseController.EditCourse);
router.post(
  "/register/update/:id",
  CheckUserAuth,
  CourseController.UpdateCourse
);
router.get("/course/courseview", CheckUserAuth, CourseController.displaycourse);

//Admin Page routing
router.get(
  "/admin/dashboard",
  CheckUserAuth,
  AuthRole("admin"),
  AdminController.dashboard
);

//Forgot password
router.post("/forgot_password", UserController.forgot_password);
router.get("/reset-password/:id/:token", FrontEndController.reset_password);

router.post("/reset-password/:id/:token", UserController.reset_password);


router.post('/admin/update_status/:id',CheckUserAuth,AdminController.UpdateStatus)
module.exports = router;
