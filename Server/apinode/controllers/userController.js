var dbConfig = require('../util/dbconfig')



//获取用户信息
let getUser = (req, res) => {
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
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//获取个人用户的所有获奖信息
let getawards = (req, res) => {
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
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//获取个人的积分排名
let getintegral_rank = async (req, res) => {
    let id = req.query.id
    let integral = await getintegral(id)
    integral = integral[0].integral
    let num = await getintegralall(integral)
    let all_num = await getpeople_num()
    let exceed = ((all_num[0].peo_num - num[0].num) / (all_num[0].peo_num - 1)) * 100
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
                exceed: parseFloat(exceed.toString().substring(0, 5))
            }
            res.send({
                code: 200,
                data: result
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//获取所有的活动信息，以及个人用户参加了的活动的信息
let getactivity = async (req, res) => {
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
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//获取activ_id 的全部详细信息
let getactivitywhole = (req, res) => {
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
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//操作
//用户参加某个活动
let join_active = async (req, res) => {
    let id = req.query.id
    let activ_id = req.query.activ_id
    let result = await getactiv_join(activ_id)
    // result = result[0].activ_result
    if (result.length > 0 && !result[0].activ_result) {
        let result_user = await getuser_activ(id, activ_id)
        // result_user = result_user[0].result
        if (result_user.length > 0 && !result_user[0].result) {
            let sql = `insert into details(id,activ_id,deta_evaluation,deta_win) value(?,?,?,?)`;
            let sqlArr = [id, activ_id, '', 0];
            let res_join = await dbConfig.SySqlConnect(sql, sqlArr);
            if (res_join.affectedRows == 1) {
                res.send({
                    code: 200,
                    msg: '成功参加活动，请按时参加活动'
                })
            } else {
                res.send({
                    code: 400,
                    msg: '出现错误'
                })
            }
        } else {
            res.send({
                code: 400,
                msg: '你已参加活动，不能再参加'
            })
        }
    } else {
        res.send({
            code: 400,
            msg: '活动已结束'
        })
    }
}

//用户活动评价(活动结束后评价)
let activ_evaluate = async (req, res) => {
    let id = req.query.id
    let activ_id = req.query.activ_id
    let join_activ = await getuser_activ(id, activ_id)
    if (join_activ.length > 0 && join_activ[0].result) {
        let activ_res = await getactiv_join(activ_id)
        if (activ_res.length > 0 && activ_res[0].activ_result) {
            let evaluate_x_res = await getuser_evaluate_x(id, activ_id)
            if (evaluate_x_res[0].deta_evaluation === '') {
                let evaluate_x = req.body.evaluate_x
                let sql = `UPDATE details SET deta_evaluation=? WHERE id=? and activ_id=?`;
                let sqlArr = [evaluate_x,id, activ_id];
                let res_join = await dbConfig.SySqlConnect(sql, sqlArr);
                if (res_join.affectedRows == 1) {
                    res.send({
                        code: 200,
                        msg: '评价完成'
                    })
                } else {
                    res.send({
                        code: 400,
                        msg: '出现错误'
                    })
                }

            } else {
                res.send({
                    code: 400,
                    msg: '已评价'
                })
            }

        } else {
            res.send({
                code: 400,
                msg: '活动未结束'
            })
        }
    } else {
        res.send({
            code: 400,
            msg: '没有参加该活动'
        })
    }
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

//获取某个活动是否结束
let getactiv_join = (activ_id) => {
    var sql = 'select activ_result from activity where activ_id=?'
    var sqlArr = [activ_id]
    return dbConfig.SySqlConnect(sql, sqlArr)
}

//获取该用户是否已经参加此活动
let getuser_activ = (id, activ_id) => {
    var sql = 'select count(id) as result from details where id=? and activ_id=?'
    var sqlArr = [id, activ_id]
    return dbConfig.SySqlConnect(sql, sqlArr)
}

//获取用户是否评价
let getuser_evaluate_x = (id, activ_id) => {
    var sql = 'select deta_evaluation from details where id=? and activ_id=?'
    var sqlArr = [id, activ_id]
    return dbConfig.SySqlConnect(sql, sqlArr)
}

//——————————

//echarts数据
//活动总数量/该用户参加活动的数量——pie
let getechartspie = async (req, res) => {
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
    dbConfig.sqlConnect(sql, sqlArr, callBack)
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
    join_active,
    activ_evaluate,
}