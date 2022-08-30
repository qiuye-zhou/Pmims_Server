var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var fileRouter = require('./routes/file')

var app = express();

var http = require('http');
var server = http.createServer(app);

//解决跨域问题，在加载路由之前使用
app.all('*', function (req, res, next) {
  // console.log(req.headers.origin)
  // console.log(req.environ)
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  // res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,token,id,grade");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("X-Powered-By", ' 3.2.1')
  if (req.method === "OPTIONS") res.send(200);/*让options请求快速返回*/
  else next();
});

// view engine setup
//有关模板的
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 中间件——token验证 (除了登入页面都需要验证token)
var token = require('./util/token')
app.use((req, res, next) => {
  const verifydata = token.verifyToken(req.headers.token)
  if (req._parsedUrl.pathname == '/file/download') {
    next()
  } else {
    if (req._parsedUrl.pathname != '/login') {
      if (verifydata.result) {
        //验证权限
        if (verifydata.data.data.id == req.headers.id && verifydata.data.data.grade == req.headers.grade) {
          next()
        } else {
          res.send({
            code: 401,
            msg: '权限认证失败'
          })
        }
      } else {
        res.send({
          code: 400,
          msg: 'token已失效'
        })
      }
    } else {
      next()
    }
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter)
app.use('/file', fileRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

server.listen('3300', () => {
  console.log('server: http://localhost:3300');
})
