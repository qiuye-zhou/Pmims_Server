var express = require('express');
var router = express.Router();
var BigData = require('../controllers/bigDataController')

// 个人信息
router.post('/getPerInfo',BigData.getPerInfo)
router.post('/getactivjoinbar', BigData.getactivjoinbar)

module.exports = router