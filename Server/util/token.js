var jwt = require('jsonwebtoken');

let getToken = (data) => {
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60),
        data
    }, 'qiuye')
    return token
}

let verifyToken = (token) => {
    try {
        var decoded = jwt.verify(token, 'qiuye')
        return {
            data: decoded,
            result: true
        }
    } catch (error) {
        return {
            msg: '解密失败',
            result: false
        }
    }
}

module.exports = {
    getToken,
    verifyToken,
}