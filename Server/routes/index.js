var express = require('express');
var router = express.Router();
var Login = require('../controllers/loginController')
var UserAdmin = require('../controllers/useradmin')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//登入
router.post('/login',Login.getlogin)
router.post('/getUsername',UserAdmin.getUsername)

//测试用 --- token
router.post('/cstoken',Login.cstoken)

module.exports = router;
