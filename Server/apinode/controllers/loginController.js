var dbConfig = require('../util/dbconfig')

//用户登入
let getlogin = (req, res) => {
    let number = req.query.number
    let password = req.query.password
    var sql = 'select * from account where number=? and password=?'
    var sqlArr = [number, password]
    var callBack = (err, data) => {
        if (err) {
            console.log(err);
            res.send({
                code: 400,
                msg: '出错了'
            });
        } else if (data == '') {
            console.log(`用户账户为${number}的用户登入失败`);
            res.send({
                code: 400,
                msg: '账户或密码错误'
            })
        } else {
            console.log(`用户账户为${number}的用户登入`);
            //返回登入成功以及用户的id和权限
            let result = { 
                id: data[0].id, 
                grade: data[0].grade 
            }
            res.send({
                code: 200,
                msg: '登入成功',
                data: result
            })
        }


    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}


module.exports = {
    getlogin
}