var dbConfig = require('../util/dbconfig')



//获取用户信息
let getUser = (req,res) => {
    let id = req.query.id
    var sql = 'select name,sex,integral,department,jiontime from personal where id=?'
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
    dbConfig.sqlConnect(sql, sqlArr,callBack)
}

//获取个人用户的所有获奖信息
let getawards = (req,res) => {
    let id = req.query.id
    var sql = 'select * from awards where id=?'
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
    dbConfig.sqlConnect(sql, sqlArr,callBack)
}

//获取个人的积分排名
let getintegral_rank = async (req,res) => {
    let id = req.query.id
    let integral = await getintegral(id)
    integral = integral[0].integral
    let num = await getintegralall(integral)
    let all_num = await getpeople_num()
    let exceed = ((all_num[0].peo_num - num[0].num)/(all_num[0].peo_num - 1)) * 100
    var sql = `select count(id) as rank from personal where department='管理员' and integral>${integral}`
    var sqlArr = [id]
    var callBack = (err, data) => {
        if (err) {
            console.log('--连接出错了--');
        } else {
            let result = {
                rank: ++data[0].rank,
                equal: num[0].num - 1,
                allnum: all_num[0].peo_num,
                exceed: exceed.toString().substring(0,5)
            }
            res.send({
                code: 200,
                data: result
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr,callBack)
}

//获取所有的活动信息，以及个人用户参加了的活动的信息
let getactivity = async (req,res) => {
    let id = req.query.id
    var sql = 'select activ_id,activ_name,activ_time,activ_result from activity'
    var sqlArr = []
    let de = await getdetails(id)
    var callBack = (err, data) => {
        if (err) {
            console.log('--连接出错了--');
        } else {
            res.send({
                code: 200,
                data: data,
                details: de
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr,callBack)
}

//获取activ_id 的全部详细信息
let getactivitywhole = async (req,res) => {
    let activ_id = req.query.activ_id
    var sql = 'select * from activity where activ_id=?'
    var sqlArr = [activ_id]
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

//非请求————方法
//获取个人用户参加了的活动的信息
let getdetails = (id) => {
    var sql = 'select activ_id,deta_evaluation,deta_win from details where id=?'
    var sqlArr = [id]
    return dbConfig.SySqlConnect(sql, sqlArr)
}

//获取个人的积分
let getintegral = (id) => {
    var sql = 'select integral from personal where id=?'
    var sqlArr = [id]
    return dbConfig.SySqlConnect(sql, sqlArr)
}

//获取和个人相同积分的人数
let getintegralall = (inte) => {
    var sql = 'select count(id) as num from personal where integral=?'
    var sqlArr = [inte]
    return dbConfig.SySqlConnect(sql, sqlArr)
}

//获取用户总人数
let getpeople_num = () => {
    var sql = `select count(id) as peo_num from personal where department!='管理员'`
    return dbConfig.SySqlConnect(sql)
}

//——————————

//echarts数据
//活动总数量/该用户参加活动的数量——pie
let getechartspie = async (req,res) => {
    let id = req.query.id
    let active_num = await getallactive_pie()
    var sql = 'select count(activ_id) as join_num from details where id=?'
    var sqlArr = [id]
    var callBack = (err, data) => {
        if (err) {
            console.log('--连接出错了--');
        } else {
            let result = {
                active_num: active_num[0].activ_num,
                join_num: data[0].join_num
            }
            res.send({
                code: 200,
                data: result
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr,callBack)
}

//非请求————方法
let getallactive_pie = () => {
    var sql = 'select count(activ_id) as activ_num from activity'
    return dbConfig.SySqlConnect(sql)
}


module.exports = {
    getUser,
    getawards,
    getactivity,
    getactivitywhole,
    getechartspie,
    getintegral_rank,
}