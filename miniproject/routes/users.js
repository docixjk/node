var express = require("express");
var mysql = require("mysql");
var fs = require("fs");
var ejs = require("ejs");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
// 로그인 정보가 URL 에 뜨면 안되니, POST 로 받자
router.post("/login", function (req, res) {
  req.session.userid = req.query.userid; //post 파라미터
  req.session.is_logined = true; //로그인 유무 확인
  // 로그인된 세션 정보 저장하는데..
  req.session.save((err) => {
    if (err) {
      throw err;
    } // 에러 발생하면 에러 메시지
    res.redirect("/"); // 에러 아니면
  });
});
router.post("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/login.html");
});
module.exports = router;
