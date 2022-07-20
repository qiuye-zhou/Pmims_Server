var express = require('express');
var router = express.Router();
var Admin = require('../controllers/adminController')

router.post('/getuser_list',Admin.getuser_list)
router.post('/getjoin_activ_user',Admin.getjoin_activ_user)

router.post('/add_activ',Admin.add_activ)

//echarts数据
router.post('/getechartspie_useractiv',Admin.getechartspie_useractiv)

module.exports = router