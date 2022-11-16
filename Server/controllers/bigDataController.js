var dbConfig = require('../util/dbconfig')

let getPerInfo = async (req, res) => {
    let id = req.body.id
    const month_activ_num = await getMonthActiv()
    const month_activ_join = await getMonthActivList(id)
    const dataUser = await getuserInfo(id)
    const activnum = await getactivnum()
    const userjoin = await getuserjoin(id)
    res.send({
        code: 200,
        data: { 
            ...dataUser, 
            userjoin: Math.floor((userjoin[0].joinnum/activnum[0].num)*100), 
            month_activ_num: month_activ_num[0].num,
            month_activ_join
        }
    })
}

//echart图用户参与活动分布数据
let getactivjoinbar = async (req, res) => {
    const year = req.body.year
    const id = req.body.id
    const activbarlist = {
        y1: 0,
        y2: 0,
        y3: 0,
        y4: 0,
        y5: 0,
        y6: 0,
        y7: 0,
        y8: 0,
        y9: 0,
        y10: 0,
        y11: 0,
        y12: 0,
    }
    try {
        var sql = `SELECT activ_time FROM details as d join activity as a on d.activ_id=a.activ_id WHERE year(activ_time)=? and id=?`
        var sqlArr = [year, id]
        const result = await dbConfig.SySqlConnect(sql, sqlArr)
        for (const item of result) {
            let mon = parseInt(item.activ_time.split('-')[1])
            switch (mon) {
                case 1:
                    activbarlist.y1++
                    break;
                case 2:
                    activbarlist.y2++
                    break;
                case 3:
                    activbarlist.y3++
                    break;
                case 4:
                    activbarlist.y4++
                    break;
                case 5:
                    activbarlist.y5++
                    break;
                case 6:
                    activbarlist.y6++
                    break;
                case 7:
                    activbarlist.y7++
                    break;
                case 8:
                    activbarlist.y8++
                    break;
                case 9:
                    activbarlist.y9++
                    break;
                case 10:
                    activbarlist.y10++
                    break;
                case 11:
                    activbarlist.y11++
                    break;
                case 12:
                    activbarlist.y12++
                    break;
            }
        }
        res.send({
            code: 200,
            data: activbarlist,
        })
    } catch (error) {
        res.send({
            code: 400,
            msg: '服务器错误'
        })
    }
}

//非请求————方法
// 获取个人用户的信息
let getuserInfo = (id) => {
    var sql = `select name,sex,integral,department from personal where id=?`
    var sqlArr = [id]
    return dbConfig.SySqlConnect(sql, sqlArr)
}
// 获取活动数量
let getactivnum = () => {
    var sql = `SELECT count(activ_id) as num FROM activity`
    return dbConfig.SySqlConnect(sql)
}
// 用户参加活动数量
let getuserjoin = (id) => {
    var sql = `select count(activ_id) as joinnum from details where id=?`
    var sqlArr = [id]
    return dbConfig.SySqlConnect(sql, sqlArr)
}
// 获取本月的活动数量
let getMonthActiv = () => {
    const date = new Date()
    const Y = date.getFullYear()
    const M = date.getMonth() - 1
    var sql = `select count(activ_id) as num from activity where YEAR(activ_time)=? and MONTH(activ_time)=?`
    var sqlArr = [Y, M]
    return dbConfig.SySqlConnect(sql, sqlArr)
}
// 获取本月用户参加活动列表
let getMonthActivList = (id) => {
    const date = new Date()
    const Y = date.getFullYear()
    const M = date.getMonth() - 1
    var sql = `select a.activ_name,a.activ_time from activity as a join details as d on a.activ_id=d.activ_id where YEAR(a.activ_time)=? and MONTH(a.activ_time)=? and d.id=?`
    var sqlArr = [Y, M, id]
    return dbConfig.SySqlConnect(sql, sqlArr)
}

module.exports = {
    getPerInfo,
    getactivjoinbar
}