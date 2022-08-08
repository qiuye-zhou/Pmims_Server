var express = require('express');
var router = express.Router();
var Admin = require('../controllers/adminController')

router.post('/getuser_list',Admin.getuser_list)
router.post('/getjoin_activ_user',Admin.getjoin_activ_user)
router.post('/getactivitywhole',Admin.getactivitywhole)
router.post('/getactiv_all',Admin.getactiv_all)
router.post('/getall_list',Admin.getall_list)
router.post('/getexlist',Admin.getexlist)

router.post('/add_activ',Admin.add_activ)
router.post('/adduser',Admin.adduser)
router.post('/edituser',Admin.edituser)
router.post('/removeuser',Admin.removeuser)

//echarts数据
router.post('/getechartspie_useractiv',Admin.getechartspie_useractiv)

module.exports = router