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
        if(filetype == 'xlsx' || filetype == 'docx') {
          //暂时保存在服务端的临时文件改名为对应用户参加活动的文件名保存在服务端
          fs.renameSync('./public/uploadac/' + file.filename, './public/uploadac/' + `ac${req.body.activ_id}user${req.body.id}.${filetype}`);  //可以根据喜爱命名方式，更改文件名称
          res.send({
              code: 200,
              msg: '上传成功'
          })
        } else {
          //上传文件不符合类型要求，删除上传暂时保存在服务端的临时文件
          fs.unlinkSync('./public/uploadac/' + file.filename)
          res.send({
            code: 406,
            msg: '上传文件错误'
          })
        }
    }
})

router.get('/download', (req, res) => {
    const name = req.query.name
    const filename = req.query.filename
    const file = `public/uploadac/${name}.docx`
    fs.access(file, fs.constants.F_OK, (err) => {
    //   console.log(`${file} ${err ? '不存在' : '存在'}`);
      if(err) {
        fs.copyFile(`./public/uploadac/${name}.xlsx`, `./public/download/${filename}.xlsx`,(err) => {
          if(err) {
            console.log(err);
          } else {
            const filePath = path.join(__dirname, '../public/download/' + filename + '.xlsx')
            res.download(filePath)
          }
        })
      } else {
        fs.copyFile(`./public/uploadac/${name}.docx`, `./public/download/${filename}.docx`,(err) => {
          if(err) {
            console.log(err);
          } else {
            const filePath = path.join(__dirname, '../public/download/' + filename + '.docx')
            res.download(filePath)
          }
        })
      }
    });
  })

module.exports = router