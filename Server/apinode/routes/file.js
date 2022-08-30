var express = require('express');
var router = express.Router();
const multer = require('multer')
let fs = require('fs');
const path = require('path')

//用户参加需要提交文件
router.post('/uploadac', multer({
    //设置文件存储路径
    dest: 'public/uploadac'   //upload文件如果不存在则会自己创建一个。
}).single('file'), function (req, res, next) {
    if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
        res.render("error", { message: "上传文件不能为空！" });
        return
    } else {
        let file = req.file;
        const filetype = file.originalname.split('.')[file.originalname.split('.').length - 1]

        fs.renameSync('./public/uploadac/' + file.filename, './public/uploadac/' + `ac${req.body.activ_id}user${req.body.id}.${filetype}`);  //可以根据喜爱命名方式，更改文件名称
        res.send({
            code: 200,
            msg: '上传成功'
        })
    }
})

router.get('/download', (req, res) => {
    const name = req.query.name
    const file = `public/uploadac/${name}.docx`
    fs.access(file, fs.constants.F_OK, (err) => {
    //   console.log(`${file} ${err ? '不存在' : '存在'}`);
      if(err) {
        const filePath = path.join(__dirname, '../public/uploadac/' + name + '.xlsx')
      res.download(filePath)
      } else {
        const filePath = path.join(__dirname, '../public/uploadac/' + name + '.docx')
      res.download(filePath)
      }
    });
  })

module.exports = router