const mysql = require('mysql')

module.exports = {
    //数据库配置
    config: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'project',
        //解决node和mysql时区不同造成的查询日期小一天的问题
        timezone: "08:00",
    },
    //连接数据库，使用连接池方式
    //连接池对象
    sqlConnect: function (sql, sqlArr, callBack) {
        var pool = mysql.createPool(this.config);
        pool.getConnection(function (err, conn) {
            // console.log('123');
            if (err) {
                console.log('连接失败');
                return;
            }
            //事件驱动回调
            conn.query(sql, sqlArr, callBack);
            //释放连接
            conn.release();
        })
    },
    //promise 回调
    SySqlConnect: function (sySql, sqlArr) {
        return new Promise((resolve, reject) => {
            var pool = mysql.createPool(this.config);
            pool.getConnection(function (err, conn) {
                // console.log('123');
                if (err) {
                    reject(err);
                } else {
                    conn.query(sySql, sqlArr, (err, data) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(data);
                        }
                        conn.release();
                    });
                }
            })
        }).catch((err) => {
            console.log(err);
        })
    }
}