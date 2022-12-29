var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customersRouter = require('./routes/customers');

//express-session에 필요한 것 빼먹으면 안됨
const session = require('express-session')                // 추가!
const fileStore = require('session-file-store')(session); // 추가!

var app = express();
app.use(
  session({ //서버단에 정보를 저장할때 쓰는거
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      // secure: true, // https:// 환경에서만 됨
      maxAge: 60000 //밀리초
    },
    store: new fileStore()
  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//customersRouter 을 요청 응답
app.use('/customers', customersRouter);

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

// 세션 미들웨더(?)   - 교재 p. 135  (이 코드를 상단부에 적어야 함.)

module.exports = app;
