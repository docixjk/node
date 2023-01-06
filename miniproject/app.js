var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var mysql = require('mysql');
var http = require('http')

//외부 파일 받아와서 선언
var startRouter = require('./routes/start');
var boardRouter = require('./routes/board');

const session = require('express-session')                // 추가!
const fileStore = require('session-file-store')(session); // 추가!

//express를 app 으로 선언
var app = express();

var server = http.createServer(app)

//세션남기기
app.use(session({
  secret: "secret key",
  resave: false,
  saveUninitialized: true,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //쿠키 사용

//다른 폴더안에 있는 파일을 쉽게 빼기 위해서
app.use('/public/', express.static('./public'));
app.use(express.static(path.join(__dirname, 'public')));

//선언한 라우터 사용하기
app.use('/', startRouter)
app.use('/board', boardRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
