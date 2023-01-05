var express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
  res.render('login') //첫번째 화면 불러오기
})

router.get("/lostark", (req, res) => {
  res.redirect('lostark.html')
})
module.exports = router;