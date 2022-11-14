const express = require('express');
const AdminController = require('../controllers/admin/AdminController');
const CourseController = require('../controllers/admin/AdminController');
const FrontEndController = require('../controllers/FrontEndController');
const UserController = require('../controllers/UserController');
const CheckUserAuth = require('../middleware/auth');
const router = express.Router();


//FrontEndController
router.get('/',FrontEndController.login)
router.get('/dashboard',CheckUserAuth,AdminController.dashboard)
router.get('/register',FrontEndController.register)

//UserController
router.post('/user/register',UserController.register)
router.post('/user/login',UserController.verify_login)
router.get('/logout',UserController.logout)

//CourseController
router.get('/course/btech',CheckUserAuth,AdminController.registercourse)
router.get('/course/mtech',CheckUserAuth,AdminController.registercourse)
router.get('/course/mba',CheckUserAuth,AdminController.registercourse)
router.get('/course/bca',CheckUserAuth,AdminController.displaycourse)
router.post('/register/btech',CheckUserAuth,AdminController.Register)
router.get('/admin/editcourse/:id',CheckUserAuth,AdminController.EditCourse)
router.post('/register/update_btech/:id',CheckUserAuth,AdminController.UpdateCourse)
router.get('/admin/viewcourse/:id',CheckUserAuth,AdminController.viewcourse)
router.get('/course/bca/:id',CheckUserAuth,AdminController.displaycourse)












module.exports = router