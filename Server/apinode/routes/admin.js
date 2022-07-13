var express = require('express');
var router = express.Router();
var Admin = require('../controllers/adminController')

router.post('/cs',Admin.getcs)

module.exports = router