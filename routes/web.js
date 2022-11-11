const express = require('express');
const FrontEndController = require('../controllers/FrontEndController');
const UserController = require('../controllers/UserController');
const CheckUserAuth = require('../middleware/auth');
const router = express.Router();


//FrontEndController
router.get('/',FrontEndController.login)
router.get('/dashboard',CheckUserAuth,FrontEndController.dashboard)
router.get('/register',FrontEndController.register)

//UserController
router.post('/user/register',UserController.register)
router.post('/user/login',UserController.verify_login)
router.get('/logout',UserController.logout)













module.exports = router