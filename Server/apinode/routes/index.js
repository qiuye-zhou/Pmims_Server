var express = require('express');
var router = express.Router();
var Login = require('../controllers/loginController')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//登入
router.post('/login',Login.getlogin)

module.exports = router;
