var dbConfig = require('../util/dbconfig')

//admin获取用户信息列表
let getuser_list = (req,res) => {
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
    dbConfig.sqlConnect(sql, sqlArr,callBack)
}

//echarts数据
//用户参加活动率(用户参加活动总数量 / 活动总数量*用户数量)——pie
let getechartspie_useractiv = async (req,res) => {
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
}