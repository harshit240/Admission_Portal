const express = require('express');
const FrontEndController = require('../controllers/FrontEndController');
const UserController = require('../controllers/UserController');
const router = express.Router();


//FrontEndController
// router.get('/',FrontEndController.dashboard)
router.get('/',FrontEndController.login)

//UserController
router.post('/register',UserController.register)





















module.exports = router