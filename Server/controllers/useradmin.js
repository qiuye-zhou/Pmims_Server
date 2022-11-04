var dbConfig = require('../util/dbconfig')

//通过id查用户名
let getUsername = (req, res) => {
    let id = req.body.id
    var sql = 'select name from personal where id=?'
    var sqlArr = [id]
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
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

module.exports = {
    getUsername,
}