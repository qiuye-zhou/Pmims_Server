var dbConfig = require('../util/dbconfig')

//admin测试
let getcs = (req,res) => {
    var sql = 'select name,sex,integral,department,jiontime from personal'
    var sqlArr = []
    var callBack = (err, data) => {
        if (err) {
            console.log('--连接出错了--');
        } else {
            res.send({
                code: 200,
                data: data
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr,callBack)
}

module.exports = {
    getcs,
}