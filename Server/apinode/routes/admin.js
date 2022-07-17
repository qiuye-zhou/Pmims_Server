var express = require('express');
var router = express.Router();
var Admin = require('../controllers/adminController')

router.post('/getuser_list',Admin.getuser_list)

router.post('/getechartspie_useractiv',Admin.getechartspie_useractiv)

module.exports = router