var express = require('express');
var router = express.Router();
var User = require('../controllers/userController')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/getuser',User.getUser)
router.post('/getawards',User.getawards)
router.post('/getactivity',User.getactivity)
router.post('/getactivitywhole',User.getactivitywhole)

router.post('/join_active',User.join_active)
router.post('/activ_evaluate',User.activ_evaluate)

//echarts数据
router.post('/getechartspie',User.getechartspie)
router.post('/getintegral_rank',User.getintegral_rank)

module.exports = router;
