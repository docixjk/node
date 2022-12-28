var express = require('express');
var router = express.Router();

/* GET users listing. */

// http://localhost:3000/users
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


// 로그인 정보가 URL 에 뜨면 안되니, POST 로 받자
router.post('/login', function (req, res) {
  req.session.email = req.query.email
  req.session.is_logined = true



  // 로그인된 세션 정보 저장하는데..
  // req.session.save(err => {
  //   // 에러 발생하면 에러 메시지
  //   if (err) {
  //     throw err;
  //   }
  //   // 에러 아니면
  //   res.redirect('/')
  // })
})
router.get("/logout", (req, res, next) => {
  req.session.destroy()
  res.redirect("/login.html")
})

module.exports = router;
