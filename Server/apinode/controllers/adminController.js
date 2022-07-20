var dbConfig = require('../util/dbconfig')

//admin获取用户信息列表
let getuser_list = (req, res) => {
    var sql = `select name,sex,integral,department,jiontime from personal where department!='管理员'`
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
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//发布活动
let add_activ = async (req, res) => {
    let activ_name = req.body.activ_name
    let activ_time = req.body.activ_time
    let activ_integral = req.body.activ_integral
    let activ_describe = req.body.activ_describe
    let form = req.body.form
    let newtime = new Date()
    let ac_time = new Date()
    let act_time_arr = activ_time.split('-')
    ac_time.setFullYear(act_time_arr[0], act_time_arr[1] - 1, act_time_arr[2])
    if (ac_time > newtime) {
        var sql = `INSERT INTO activity(activ_name, activ_time, activ_integral, activ_describe, form) VALUES (?,?,?,?,?)`
        var sqlArr = [activ_name, activ_time, activ_integral, activ_describe, form]
        try {
            let res_add = await dbConfig.SySqlConnect(sql, sqlArr);
            if (res_add.affectedRows == 1) {
                res.send({
                    code: 200,
                    msg: '活动发布成功'
                })
            } else {
                res.send({
                    code: 400,
                    msg: '出现错误'
                })
            }
        } catch (error) {
            res.send({
                code: 400,
                msg: '活动发布失败'
            })
        }
    } else {
        res.send({
            code: 400,
            msg: '时间设置错误'
        })
    }
}

//查询所有参加某个活动的用户
let getjoin_activ_user = (req,res) => {
    let ac_id = req.body.activ_id
    var sql = `select d.id,p.name,p.sex,d.deta_evaluation,d.deta_win from details as d join personal as p on d.id = p.id where d.activ_id=?`
    var sqlArr = [ac_id]
    var callBack = (err, data) => {
        if (err) {
            console.log('--连接出错了--');
        } else {
            let result = data
            result.forEach(e => {
                e.deta_win = e.deta_win == 0 ? false : true
            });
            res.send({
                code: 200,
                data: result
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//echarts数据
//用户参加活动率(用户参加活动总数量 / 活动总数量*用户数量)——pie
let getechartspie_useractiv = async (req, res) => {
    let user_num = await getusers_num()
    let activ_num = await getactiv_num()
    let users_join_num = await getusers_join()
    let pienum = (users_join_num[0].users_join_num / (user_num[0].user_num * activ_num[0].activ_num)) * 100
    let result = {
        user_activ_num: user_num[0].user_num * activ_num[0].activ_num,
        users_join_num: users_join_num[0].users_join_num,
        pienum: parseFloat(pienum.toString().substring(0, 5))
    }
    res.send({
        code: 200,
        data: result
    })
}

//非请求————方法
//获取用户数量
let getusers_num = () => {
    var sql = `select count(id) as user_num from personal where department!='管理员'`
    return dbConfig.SySqlConnect(sql)
}

//获取活动数量
let getactiv_num = () => {
    var sql = `select count(activ_id) as activ_num from activity`
    return dbConfig.SySqlConnect(sql)
}

//获取所有用户参加活动数量
let getusers_join = () => {
    var sql = `select count(id) as users_join_num from details`
    return dbConfig.SySqlConnect(sql)
}

module.exports = {
    getuser_list,
    getechartspie_useractiv,
    add_activ,
    getjoin_activ_user,
}