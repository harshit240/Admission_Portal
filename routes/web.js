const express = require('express');
const AdminController = require('../controllers/admin/AdminController');
const CourseController = require('../controllers/CourseController');
const FrontEndController = require('../controllers/FrontEndController');
const UserController = require('../controllers/UserController');
const CheckUserAuth = require('../middleware/auth');
const AuthRole = require('../middleware/authrole');
const router = express.Router();


//FrontEndController
router.get('/',FrontEndController.login)
router.get('/register',FrontEndController.register)
router.get('/about',CheckUserAuth,FrontEndController.about)
router.get('/contact',CheckUserAuth,FrontEndController.contact)
router.get('/dashboard',CheckUserAuth,CourseController.dashboard)

//UserController
router.post('/user/register',UserController.register)
router.post('/user/login',UserController.verify_login)
router.get('/logout',UserController.logout)

//CourseController
router.get('/course/btech',CheckUserAuth,CourseController.course_form)
router.get('/course/bca',CheckUserAuth,CourseController.course_form2)
router.get('/course/mca',CheckUserAuth,CourseController.course_form3)

router.post('/register/btech',CheckUserAuth,CourseController.Register)
router.post('/register/bca',CheckUserAuth,CourseController.Register)
router.post('/register/mca',CheckUserAuth,CourseController.Register)

// router.get('/course/bca/:id',CheckUserAuth,CourseController.displaycourse)
router.get('/viewcourse/:id',CheckUserAuth,CourseController.viewcourse)
router.get('/editcourse/:id',CheckUserAuth,CourseController.EditCourse)
router.post('/register/update/:id',CheckUserAuth,CourseController.UpdateCourse)

router.get('/course/courseview',CheckUserAuth,CourseController.displaycourse)


//Admin Page routing
router.get('/admin/dashboard',CheckUserAuth,AuthRole('admin'),AdminController.dashboard)











module.exports = router