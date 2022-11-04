var express = require('express');
var router = express.Router();
const multer = require('multer')
let fs = require('fs');
const path = require('path')

//用户参加需要提交文件
router.post('/uploadac', multer({
    //设置文件存储路径
    dest: 'public/uploadac'   //uploadac文件如果不存在则会自己创建一个。
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
    //拿到活动名称活动ID用于判断保存文件夹名称、位置
    const activ_name = req.query.activname
    const activ_id = req.query.acid
    fs.exists(`./public/downloadac/ID${activ_id}${activ_name}`, function(exists) {
      if(!exists) {
        fs.mkdir(`./public/downloadac/ID${activ_id}${activ_name}`,function(err){
          if(err) console.error(err);
          console.log(`创建目录ID${activ_id}${activ_name}成功`);
        });
      }
    });
    //——————
    const file = `public/uploadac/${name}.docx`
    fs.access(file, fs.constants.F_OK, (err) => {
    //   console.log(`${file} ${err ? '不存在' : '存在'}`);
      if(err) {
        fs.copyFile(`./public/uploadac/${name}.xlsx`, `./public/downloadac/ID${activ_id}${activ_name}/${filename}.xlsx`,(err) => {
          if(err) {
            console.log(err);
          } else {
            const filePath = path.join(__dirname, `../public/downloadac/ID${activ_id}${activ_name}/` + filename + '.xlsx')
            res.download(filePath)
          }
        })
      } else {
        fs.copyFile(`./public/uploadac/${name}.docx`, `./public/downloadac/ID${activ_id}${activ_name}/${filename}.docx`,(err) => {
          if(err) {
            console.log(err);
          } else {
            const filePath = path.join(__dirname, `../public/downloadac/ID${activ_id}${activ_name}/` + filename + '.docx')
            res.download(filePath)
          }
        })
      }
    });
})

//用户提交审核提交的文件
router.post('/uploadex', multer({
  //设置文件存储路径
  dest: 'public/uploadex'   //uploadex文件如果不存在则会自己创建一个。
}).single('file'), function (req, res, next) {
  if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
      res.render("error", { message: "上传文件不能为空！" });
      return
  } else {
      let file = req.file;
      const fileexname = req.body.ex_id
      const filetype = file.originalname.split('.')[file.originalname.split('.').length - 1]
      if(filetype == 'jpg' || filetype == 'pdf' || filetype == 'png') {
        //暂时保存在服务端的临时文件改名为对应用户参加活动的文件名保存在服务端
        fs.renameSync('./public/uploadex/' + file.filename, './public/uploadex/' + `ex${fileexname}.${filetype}`);  //可以根据喜爱命名方式，更改文件名称
        res.send({
            code: 200,
            msg: '上传成功'
        })
      } else {
        //上传文件不符合类型要求，删除上传暂时保存在服务端的临时文件
        fs.unlinkSync('./public/uploadex/' + file.filename)
        res.send({
          code: 406,
          msg: '上传文件错误'
        })
      }
  }
})

router.get('/downloadex', (req, res) => {
  const username = req.query.username
  const name = req.query.name
  const file = `public/uploadex/${name}.jpg`
  fs.access(file, fs.constants.F_OK, (err) => {
  //   console.log(`${file} ${err ? '不存在' : '存在'}`);
    if(err) {
      const filet = `public/uploadex/${name}.png`
      fs.access(filet, fs.constants.F_OK, (err) => {
      if(err) {
        fs.copyFile(`./public/uploadex/${name}.pdf`,`./public/downloadex/${username}.pdf`,(err) => {
          if(err) {
            console.log(err);
          } else {
            const filePath = path.join(__dirname, '../public/downloadex/' + username + '.pdf')
            res.download(filePath)
          }
        })
      } else {
        fs.copyFile(`./public/uploadex/${name}.png`,`./public/downloadex/${username}.png`,(err) => {
          if(err) {
            console.log(err);
          } else {
            const filePath = path.join(__dirname, '../public/downloadex/' + username + '.png')
            res.download(filePath)
          }
        })
      }
      })
    } else {
      fs.copyFile(`./public/uploadex/${name}.jpg`,`./public/downloadex/${username}.jpg`,(err) => {
        if(err) {
          console.log(err);
        } else {
          const filePath = path.join(__dirname, '../public/downloadex/' + username + '.jpg')
          res.download(filePath)
        }
      })
    }
  });
})

//用户提交审核提交的文件
router.post('/uploadimage', multer({
  //设置文件存储路径
  dest: 'public/head_image'   //uploadex文件如果不存在则会自己创建一个。
}).single('file'), function (req, res, next) {
  if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
      res.render("error", { message: "上传文件不能为空！" });
      return
  } else {
      let file = req.file;
      const fileexname = req.body.id
      const filetype = file.originalname.split('.')[file.originalname.split('.').length - 1]
      if(filetype == 'jpg' || filetype == 'png') {
        //暂时保存在服务端的临时文件改名为对应用户参加活动的文件名保存在服务端
        fs.renameSync('./public/head_image/' + file.filename, './public/head_image/' + `user_img${fileexname}.${filetype}`);  //可以根据喜爱命名方式，更改文件名称
        res.send({
            code: 200,
            msg: '上传成功'
        })
      } else {
        //上传文件不符合类型要求，删除上传暂时保存在服务端的临时文件
        fs.unlinkSync('./public/head_image/' + file.filename)
        res.send({
          code: 406,
          msg: '上传文件错误'
        })
      }
  }
})


module.exports = router