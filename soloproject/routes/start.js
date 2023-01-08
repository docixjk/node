var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  // 쿠키 읽기
  if (req.cookies) {
    console.log(req.cookies); // { mycookie: 'test'}
  } else {
    // 클라이언트에 저장된 쿠키가 없다면
    // 쿠키 쓰기
    // 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    res.cookie("name", encodeURIComponent(name), {
      expires: new Date(),
      httpOnly: true,
      path: "/",
    });
  }
  res.render("login"); //첫번째 화면 불러오기
});
module.exports = router;
